from Bio import Restriction
from Bio.Restriction.PrintFormat import PrintFormat
from Bio.Seq import Seq
from Bio import SeqIO
import contextlib
import io
from statistics import mean
from statistics import median
from statistics import mode
from io import StringIO
import sys
from contextlib import redirect_stdout
import os
import argparse
import flask
from flask import Flask, request, jsonify

# Helper functions


def find_avg_product_length(enzyme, sequence):
  try:
    avg = round(mean(map(len, enzyme.catalyse(sequence))))
    return avg
  except:
    return "Unknown"


def find_median_product_length(enzyme, sequence):
  try:
    med = round(median(map(len, enzyme.catalyse(sequence))))
    return med
  except:
    return "Unknown"


def find_mode_product_length(enzyme, sequence):
  try:
    mod = round(mode(map(len, enzyme.catalyse(sequence))))
    return mod
  except:
    return "Unknown"


# def check_if_valid_fasta_string(data):
#   try:

#     # Check if starts with '>'
#     if not data.strip().startswith(">"):
#       raise ValueError("Invalid fasta string. It needs to start with '>'")

#     # Check if the string represents a valid FASTA file
#     fasta = SeqIO.read(StringIO(data), "fasta")

#   except Exception as e:
#     raise e


def load_dna_from_string(data):
  try:
    dna_dict = {}

    # Check if the string is a valid FASTA file
    # check_if_valid_fasta_string(data)

    # Read the string into a dictionary
    fasta = SeqIO.parse(StringIO(data), "fasta")
    for record in fasta:
      # Check if sequence is valid
      # Only valid if sequence contains A, T, G, C, U, or N
      # if not set(record.seq).issubset("ATGCUatgcuNn"):
      #   raise ValueError("Invalid sequence")

      # Read sequence into dictionary
      dna_dict[record.id] = record.seq

    return dna_dict

  except Exception as e:
    print("Invalid FASTA string")
    print(e)

# Perform restriction enzyme analysis


def re_digest_analysis(sequence_to_cut: dict, sequence_to_not_cut: dict = {}, enzymes: dict = {}, min_cuts: int = 0, max_cuts: int = 9999999999, output_style: str = "map"):
  """Perform a restriction enzyme analysis on a sequence and output the results to a string

  sequence_to_cut: dict (a dictionary of sequences to cut with the key being the name of the sequence (> line in fasta file) and the value being the sequence itself)
      e.g.
        .fasta file:
            >seq1
            ACTGCT
            >seq2
            GCTACT
        dict:
            {"seq1": "ACTGCT", "seq2": "GCTACT"}

  sequence_to_not_cut: dict (a dictionary of sequences to not cut with the key being the name of the sequence (> line in fasta file) and the value being the sequence itself)

  enzymes: dict (a dictionary of enzymes to be used in the analysis with the key being the name of the enzyme and the value being the enzyme object itself)
      e.g.
        {"EcoRI": EcoRI, "BamHI": BamHI, etc.}


  min_cuts: int (the minimum number of cuts to be considered in the analysis)

  max_cuts: int (the maximum number of cuts to be considered in the analysis)

  output_style: str (select output format for the analysis)
      Valid format are:
      'list'      -> alphabetical order
      'number'    -> number of sites in the sequence
      'map'       -> a map representation of the sequence with the sites.
  """

  # Error handling
  if not isinstance(sequence_to_cut, dict):
    raise TypeError("sequence_to_cut must be a dictionary")
  if not isinstance(sequence_to_not_cut, dict):
    raise TypeError("sequence_to_not_cut must be a dictionary")
  if not isinstance(enzymes, dict):
    raise TypeError("enzymes must be a dictionary")
  if not isinstance(min_cuts, int):
    raise TypeError("min_cuts must be an integer")
  if not isinstance(max_cuts, int):
    raise TypeError("max_cuts must be an integer")
  if not isinstance(output_style, str):
    raise TypeError("output_style must be a string")
  if output_style not in ["list", "number", "map"]:
    raise ValueError(
        "output_style must be either 'list', 'number' or 'map'")
  if min_cuts < 0:
    raise ValueError("min_cuts must be greater than or equal to 0")
  if max_cuts < 0:
    raise ValueError("max_cuts must be greater than or equal to 0")
  if min_cuts > max_cuts:
    raise ValueError("min_cuts must be less than or equal to max_cuts")

  # Get enzymes batch
  re_enzymes = Restriction.RestrictionBatch(enzymes)

  # Check if sequences to not cut are provided
  enzymes_that_cut_restricted_seq = []
  if sequence_to_not_cut:
    # Perform analysis on sequences to not cut
    for i, seq in enumerate(sequence_to_not_cut.keys()):
      re_analysis_not_cut = Restriction.Analysis(
          re_enzymes, sequence_to_not_cut[seq], linear=True)

    # Exclude enzymes that cut the sequence from the enzyme batch
      enzymes_that_cut_restricted_seq.extend(
          [k for k, v in re_analysis_not_cut.full().items() if v != []])

  enzymes_that_cut_less_than_min_cuts = []
  enzymes_that_cut_more_than_max_cuts = []
  # Check if min_cuts or max_cuts are provided
  if min_cuts != 0 or max_cuts != 9999999999:
    # Perform analysis on sequences to cut
    for i, seq in enumerate(sequence_to_cut.keys()):

      re_analysis_cut = Restriction.Analysis(
          re_enzymes, sequence_to_cut[seq], linear=True)

      enzymes_that_cut_less_than_min_cuts.extend([k for k, v in re_analysis_cut.full(
      ).items() if len(v) < min_cuts and k not in enzymes_that_cut_less_than_min_cuts])

      enzymes_that_cut_more_than_max_cuts.extend([k for k, v in re_analysis_cut.full(
      ).items() if len(v) > max_cuts and k not in enzymes_that_cut_more_than_max_cuts])

  # Exclude enzymes that fail filter from the enzyme batch
  enzymes_to_remove = list(set(enzymes_that_cut_restricted_seq +
                               enzymes_that_cut_less_than_min_cuts + enzymes_that_cut_more_than_max_cuts))
  if len(enzymes_to_remove) > 0:
    re_enzymes = Restriction.RestrictionBatch(
        [k for k, v in re_analysis_cut.full().items() if k not in enzymes_to_remove])

  # Perform final analysis on sequences to cut and output results
  nl = "\n"
  tab = "   "
  output = ""
  with io.StringIO() as buf, redirect_stdout(buf):
    for i, seq in enumerate(sequence_to_cut.keys()):
      if len(seq) > 15:
        seq_display = seq[:15] + "..."
      else:
        seq_display = seq
      output_message = f"Restriction Digest Analysis on Sequence: {seq_display}"
      if i != 0:
        print("\n")
      print("-" * (len(output_message) + 3))
      print(output_message)
      print("-" * (len(output_message) + 3), end="\n\n")

      re_analysis = Restriction.Analysis(
          re_enzymes, sequence_to_cut[seq], linear=True)

      re_analysis.print_as(output_style)

      try:
        re_analysis.print_that()
      except AttributeError:
        pass

      LINESIZE_TO_OUTPUT_6_ENZYMES_PER_ROW = 50
      PrintFormat.linesize = LINESIZE_TO_OUTPUT_6_ENZYMES_PER_ROW

      if sequence_to_not_cut:
        print(re_analysis._make_nocut_only(nc=enzymes_that_cut_restricted_seq,
              s1=f"{tab}Enzymes that cut restricted sequences{nl}{nl}"))

      if min_cuts != 0:
        print(re_analysis._make_nocut_only(nc=enzymes_that_cut_less_than_min_cuts,
              s1=f"{tab}Enzymes that cut less than {min_cuts} times{nl}{nl}"))

      if max_cuts != 9999999999:
        print(re_analysis._make_nocut_only(nc=enzymes_that_cut_more_than_max_cuts,
              s1=f"{tab}Enzymes that cut more than {max_cuts} times{nl}{nl}"))

      output = buf.getvalue()

  return output


app = Flask(__name__)


@app.route('/path/to/python_script', methods=['POST'])
def process_request():
  data = request.json

  # Perform the analysis using the received data
  dna_to_cut_raw = data['dna_to_cut']
  dna_to_not_cut_raw = data['dna_to_not_cut']
  enzymes_raw = data['enzymes']

  # DNA sequences
  dna_to_cut = load_dna_from_string(dna_to_cut_raw)
  dna_to_not_cut = load_dna_from_string(dna_to_not_cut_raw)

  # Convert enzymes to dictionary
  enzymes = {str(enzyme): getattr(Restriction, str(enzyme))
             for enzyme in sorted(enzymes_raw)}

  min_cuts = data['min_cuts']
  max_cuts = data['max_cuts']
  output_style = data['output_style']

  # Perform analysis
  analysis_output_str = re_digest_analysis(
      sequence_to_cut=dna_to_cut,
      sequence_to_not_cut=dna_to_not_cut,
      enzymes=enzymes,
      min_cuts=min_cuts,
      max_cuts=max_cuts,
      output_style=output_style
  )
  print(analysis_output_str)

  # Write analysis output to file
  with open("./src/outputs/restriction-digest-analysis.txt", "w") as f:
    f.write(analysis_output_str)

  # Return the analysis output as JSON response
  return jsonify({'analysis_output': analysis_output_str})


if __name__ == "__main__":
  parser = argparse.ArgumentParser(
    description="Perform restriction enzyme analysis on DNA sequences.")
  parser.add_argument("--dna_to_cut", type=str,
                      help="Path to the FASTA file containing sequences to cut.")
  parser.add_argument("--dna_to_not_cut", type=str, default="",
                      help="Path to the FASTA file containing sequences not to cut.")
  parser.add_argument("--enzymes", nargs="+",
                      help="List of enzymes to be used in the analysis.")
  parser.add_argument("--min_cuts", type=int, default=0,
                      help="Minimum number of cuts to be considered in the analysis.")
  parser.add_argument("--max_cuts", type=int, default=9999999999,
                      help="Maximum number of cuts to be considered in the analysis.")
  parser.add_argument("--output_style", type=str, default="map", choices=[
                      "list", "number", "map"], help="Output format for the analysis. Choose from 'list', 'number', or 'map'. Default is 'map'.")

  args = parser.parse_args()

  dna_to_cut_raw = args.dna_to_cut
  dna_to_not_cut_raw = args.dna_to_not_cut
  enzymes_raw = args.enzymes

  # DNA sequences
  dna_to_cut = load_dna_from_string(dna_to_cut_raw)
  dna_to_not_cut = load_dna_from_string(dna_to_not_cut_raw)

  # Convert enzymes to dictionary
  enzymes = {str(enzyme): getattr(Restriction, str(enzyme))
             for enzyme in sorted(enzymes_raw)}

  min_cuts = args.min_cuts
  max_cuts = args.max_cuts
  output_style = args.output_style

  # print("dna_to_cut: ", dna_to_cut)
  # print("dna_to_cut: ", dna_to_cut.__class__)
  # print("dna_to_not_cut: ", dna_to_not_cut)
  # print("dna_to_not_cut: ", dna_to_not_cut.__class__)
  # print("enzymes: ", enzymes)
  # print("enzymes: ", enzymes.__class__)
  # print("min_cuts: ", min_cuts)
  # print("min_cuts: ", min_cuts.__class__)
  # print("max_cuts: ", max_cuts)
  # print("max_cuts: ", max_cuts.__class__)
  # print("output_style: ", output_style)
  # print("output_style: ", output_style.__class__)
  # Perform analysis
  analysis_output_str = re_digest_analysis(sequence_to_cut=dna_to_cut, sequence_to_not_cut=dna_to_not_cut,
                                           enzymes=enzymes, min_cuts=args.min_cuts, max_cuts=args.max_cuts, output_style=args.output_style)

  # print(analysis_output_str)

  # Write analysis output to file
  with open("./src/outputs/restriction-digest-analysis.txt", "w") as f:
    f.write(analysis_output_str)

  # Return the analysis output as JSON response
  # jsonify({'analysis_output': analysis_output_str})
  # app.run(debug=True)
