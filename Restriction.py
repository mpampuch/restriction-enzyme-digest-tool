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


def is_file_size_less_than_xMb(file_path, Mb):
  file_size_bytes = os.path.getsize(file_path)
  file_size_mb = file_size_bytes / \
      (1024 * 1024)  # Convert bytes to megabytes
  return file_size_mb < Mb


def check_if_valid_fasta_file(file):
  try:
    with open(file, "r") as handle:
      # check if starts with >
      if not handle.read().startswith(">"):
        raise ValueError("Invalid fasta file. Needs to start with >")

      # check if remaining file is fasta
      fasta = SeqIO.parse(handle, "fasta")
      if not fasta:
        raise ValueError("Invalid fasta file")

      # Check if total size of file is less than 1Mb
      if is_file_size_less_than_xMb(file, 1) == False:
        raise ValueError("Fast file is too large")

  except Exception as e:
    raise e


def load_dna(file):
  try:
    dna_dict = {}
    # check if the file exists
    with open(file) as f:
      pass

    # Check if valid fasta file
    check_if_valid_fasta_file(file)

    # Read file into dictionary
    with open(file) as dna:
      for record in SeqIO.parse(dna, "fasta"):
        # Check if sequence is valid
        # Only valid if sequence contains A, T, G, C, U, or N
        if not set(record.seq).issubset("ATGCUatgcuNn"):
          raise ValueError("Invalid sequence")

        # Read sequence into dictionary
        dna_dict[record.id] = record.seq

    return dna_dict

  except Exception as e:
    print(f"{file} is not a valid fasta file")
    print(e)


# DNA sequences
dna_to_cut = load_dna("dna_to_cut.fa")
dna_to_not_cut = load_dna("dna_to_not_cut.fa")
print(dna_to_cut)
print(dna_to_not_cut)

# Restriction enzymes
commercial_enzymes = {str(x): getattr(Restriction, str(x))
                      for x in sorted(list(Restriction.CommOnly))}
# print(commercial_enzymes)

# Extra parameters
min_cuts = 0
max_cuts = 9999999999
detailed = False

# Perform restriction enzyme analysis


def re_digest_analysis(sequence_to_cut: dict, sequence_to_not_cut: dict = {}, enzymes: dict = commercial_enzymes, min_cuts: int = 0, max_cuts: int = 9999999999, output_style: str = "map"):
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

  # todo ---------------
  # TODO PERFORM FILTERING OF ENZYMES THAT DOES NOT REQUIRE A DIGESTION ANALYSIS (I.E. RESTRICTION SITE, METHYLATION, ETC.)

  # todo ---------------

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
      output_message = f"Restriction Digest Analysis on Sequence: {seq}"
      if i != 0:
        print("\n")
      print("-" * (len(output_message) + 3))
      print(output_message)
      print("-" * (len(output_message) + 3), end="\n\n")

      re_analysis = Restriction.Analysis(
          re_enzymes, sequence_to_cut[seq], linear=True)

      re_analysis.print_as(output_style)

      re_analysis.print_that()

  # todo ---------------
  # TODO TEST IF THESE CUSTOM OUTPUT FUNCTIONS WORK ON ANY OTHER OUTPUT SETTING OTHER THAN 'map'

      if sequence_to_not_cut:
        print(re_analysis._make_nocut_only(nc=enzymes_that_cut_restricted_seq,
              s1=f"{tab}Enzymes that cut restricted sequences{nl}{nl}"))

      if min_cuts != 0:
        print(re_analysis._make_nocut_only(nc=enzymes_that_cut_less_than_min_cuts,
              s1=f"{tab}Enzymes that cut less than {min_cuts} times{nl}{nl}"))

      if max_cuts != 9999999999:
        print(re_analysis._make_nocut_only(nc=enzymes_that_cut_more_than_max_cuts,
              s1=f"{tab}Enzymes that cut more than {max_cuts} times{nl}{nl}"))

  # todo ---------------

      output = buf.getvalue()

  return output


# test_seq = {}
# with open("./random_dna_1.fa") as dna:
#     for record in SeqIO.parse(dna, "fasta"):
#         test_seq[record.id] = record.seq
# # print(test_seq)
# test_restricted_seq = {}
# with open("./restricted_dna_1.fa") as dna:
#     for record in SeqIO.parse(dna, "fasta"):
#         test_restricted_seq[record.id] = record.seq
# # print(test_restricted_seq)

test = re_digest_analysis(sequence_to_cut=dna_to_cut, sequence_to_not_cut=dna_to_not_cut,
                          enzymes=commercial_enzymes, min_cuts=0, max_cuts=1, output_style="map")
print(test)
