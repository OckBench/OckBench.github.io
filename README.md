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
@article{du2025ockbench,
  title={OckBench: Measuring the Efficiency of LLM Reasoning},
  author={Du, Zheng and Kang, Hao and Han, Song and Krishna, Tushar and Zhu, Ligeng},
  journal={arXiv preprint arXiv:2511.05722},
  year={2025}
}
```

## Local Development

To run the website locally:

```bash
# Clone the repository
git clone https://github.com/OckBench/OckBench.github.io.git
cd OckBench.github.io

# Open in browser
open index.html
# or use a local server
python -m http.server 8000
```

## License

This project is licensed under the MIT License.

## About This Site

The site is a bespoke, dependency-free static page: hand-written CSS (`static/css/ock.css`) and JavaScript (`static/js/ock.js`), with leaderboard data in `static/data/top200_model_performance.csv` and per-domain (Math/Coding/Science) data in `static/data/per_domain_performance.csv`.

## Updating the Data

Both data files are generated from the evaluation pipeline in the `ockbench-ops` repo — do not edit them by hand:

- `static/data/top200_model_performance.csv` — `ockbench-ops/scripts/build_website_leaderboard.py`
- `static/data/per_domain_performance.csv` — `ockbench-ops/scripts/build_website_per_domain.py`

Re-run the scripts after evaluating new models and copy the outputs here. The table, scatter chart, and heatmap all render from the CSVs at load time (counts update automatically). For each new model, optionally review `static/js/ock.js`: add it to `SELECTED_MODELS` (shown by default; otherwise it appears under "Show all"), `DISPLAY_NAMES` (pretty display name), `LOGO_MAP` + `static/images/logos/` (new organization), and `EFFORT_SERIES` (connect effort variants in the scatter). For a new model family, add a matching `.chart-pt.f-<family>` color in `static/css/ock.css` — unknown families fall back to neutral gray.
