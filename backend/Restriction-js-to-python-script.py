from Bio import Restriction
from Bio.Restriction.PrintFormat import PrintFormat
from Bio import SeqIO
import io
from statistics import mean
from statistics import median
from statistics import mode
from io import StringIO
from contextlib import redirect_stdout
import argparse

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


def load_dna_from_string(data):
  try:
    dna_dict = {}

    # Read the string into a dictionary
    fasta = SeqIO.parse(StringIO(data), "fasta")
    for record in fasta:

      # Read sequence into dictionary
      dna_dict[record.id] = record.seq

    return dna_dict

  except Exception as e:
    print("Invalid FASTA string")
    print(e)

# Perform restriction enzyme analysis


def re_digest_analysis(sequence_to_cut: dict,
                       sequence_to_not_cut: dict = {},
                       enzymes: dict = {},
                       min_cuts: int = 0,
                       max_cuts_enabled: bool = False,
                       max_cuts: int = 9999999999,
                       output_style: str = "map"):
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
  if min_cuts != 0 or max_cuts != (9999999999 + 1):
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
        if enzymes_that_cut_restricted_seq == []:
          print(re_analysis._make_nocut_only(nc=enzymes_that_cut_restricted_seq,
                s1=f"{tab}No enzymes cut the restricted sequence(s).{nl}{nl}"))
        else:
          print(re_analysis._make_nocut_only(nc=enzymes_that_cut_restricted_seq,
                s1=f"{tab}Enzymes that cut the restricted sequence(s).{nl}{nl}"))

      if min_cuts != 0:
        if enzymes_that_cut_less_than_min_cuts == []:
          print(re_analysis._make_nocut_only(nc=enzymes_that_cut_more_than_max_cuts,
                s1=f"{tab}No enzymes cut more than {min_cuts} time{'' if min_cuts == 1 else 's'}.{nl}{nl}"))
        else:
          print(re_analysis._make_nocut_only(nc=enzymes_that_cut_less_than_min_cuts,
                s1=f"{tab}Enzymes that cut less than {min_cuts} time{'' if min_cuts == 1 else 's'}.{nl}{nl}"))

      if max_cuts_enabled:
        if enzymes_that_cut_more_than_max_cuts == []:
          print(re_analysis._make_nocut_only(nc=enzymes_that_cut_more_than_max_cuts,
                s1=f"{tab}No enzymes cut more than {max_cuts} time{'' if max_cuts == 1 else 's'}.{nl}{nl}"))
        else:
          print(re_analysis._make_nocut_only(nc=enzymes_that_cut_more_than_max_cuts,
                s1=f"{tab}Enzymes that cut more than {max_cuts} time{'' if max_cuts == 1 else 's'}.{nl}{nl}"))

      output = buf.getvalue()

  return output


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
  parser.add_argument("--max_cuts_enabled", type=str, default="False", choices=["True", "False"],
                      help="Whether maximum number of cuts should be considered.")
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
  max_cuts_enabled = eval(args.max_cuts_enabled)
  output_style = args.output_style

  # Perform analysis
  analysis_output_str = re_digest_analysis(sequence_to_cut=dna_to_cut,
                                           sequence_to_not_cut=dna_to_not_cut,
                                           enzymes=enzymes,
                                           min_cuts=min_cuts,
                                           max_cuts_enabled=max_cuts_enabled,
                                           max_cuts=max_cuts,
                                           output_style=output_style)

  print(analysis_output_str)
