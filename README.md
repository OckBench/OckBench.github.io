# OckBench: Tokens are Not to Be Multiplied without Necessity

Official website for OckBench, the first model-agnostic, hardware-agnostic benchmark that jointly measures **accuracy and decoding token count** for LLM reasoning and coding tasks.

## About

> "Entities must not be multiplied beyond necessity." — The Principle of Ockham's Razor

OckBench addresses a critical gap in LLM evaluation by measuring not just correctness, but also the **decoding token efficiency** required for reasoning. While most benchmarks focus solely on accuracy, OckBench reveals that models with comparable accuracy can differ by 10-18× in token consumption—a neglected but significant axis of differentiation.

## Website

Visit the website at: [https://OckBench.github.io](https://OckBench.github.io)

## Features

- **Model-Agnostic Efficiency Metric**: Uses decoding token count as an intrinsic, hardware- and system-independent efficiency metric
- **Two Domains**: 
  - **OckBench-Math**: 200 questions from GSM8K, AIME24, AIME25 with high token variance
  - **OckBench-Coding**: 200 curated problems from MBPP variant and real-world coding challenges
- **18 Models Evaluated**: Including GPT-5, GPT-o3, Gemini 2.5 Pro/Flash, Qwen3, Nemotron, and more
- **Reasoning Efficiency Metric**: #Tokens / Accuracy (lower is better)
- **Interactive Leaderboard**: Switch between Math and Coding domains
- **Token Variance Selection**: Focuses on problems where models exhibit significant efficiency differences

## Key Findings

- **GPT-4o is the most token-efficient**: Achieves reasoning efficiency of 14.1 (math) and 12.9 (coding)
- **2× token variance among top models**: Gemini-2.5 Pro used 2× more tokens than GPT-5 for similar accuracy
- **"Thinking" modes increase tokens**: Qwen3-14B thinking used 2.7× more tokens than non-thinking mode
- **Commercial models lead**: Average 60.8% accuracy vs 35.3% for open-source on math tasks
- **Token efficiency matters**: Models can differ by 10-18× in token consumption despite similar accuracy

## Paper

Submitted to NeurIPS 2025 Workshop on Efficient Reasoning.

## Dataset

- **OckBench-Math**: Top 200 questions from GSM8K + AIME24/25
- **OckBench-Coding**: 200 problems from MBPP variant + curated real-world challenges

## Citation

```bibtex
@inproceedings{ockbench2025,
  title={OckBench: Tokens are Not to Be Multiplied without Necessity},
  author={Anonymous},
  booktitle={NeurIPS 2025 Workshop on Efficient Reasoning},
  year={2025}
}
```

## Local Development

To run the website locally:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/OckBench.github.io.git
cd OckBench.github.io

# Open in browser
open index.html
# or use a local server
python -m http.server 8000
```

## License

This project is licensed under the MIT License.

## Acknowledgments

This website is built using the [Nerfies](https://github.com/nerfies/nerfies.github.io) template with Bulma CSS framework.
