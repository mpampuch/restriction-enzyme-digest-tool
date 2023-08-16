from Bio import Restriction
from Bio.Seq import Seq
from Bio import SeqIO
import contextlib
import io
from statistics import mean
from statistics import median
from statistics import mode 

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

def check_if_valid_fasta_file(file):
    try:
        with open(file, "r") as handle:
            fasta = SeqIO.parse(handle, "fasta")
            return True
    except:
        return False

# DNA sequences
try:
  # TODO check if dna_to_cut.fasta exists
  check_if_valid_fasta_file("dna_to_cut.fasta")
  dna_to_cut = SeqIO.read("dna_to_cut.fasta", "fasta")
except:
  print("dna_to_cut.fasta is not a valid fasta file")
  
try:
  # TODO check if dna_to_not_cut.fasta exists
  check_if_valid_fasta_file("dna_to_not_cut.fasta")
  dna_to_not_cut = SeqIO.read("dna_to_not_cut.fasta", "fasta")
except:
  print("dna_to_not_cut.fasta is not a valid fasta file")

# Restriction enzymes
commercial_enzymes = Restriction.CommOnly
print(commercial_enzymes)

# Extra parameters
min_cuts = 0
max_cuts = 9999999999
detailed = False

# Perform restriction enzyme analysis
def re_digest_analysis(sequence_to_cut: str = "", sequence_to_not_cut: str = "", enzymes: list = commercial_enzymes, min_cuts: int = 0, max_cuts: int = 9999999999, detailed: bool = False):
  pass
