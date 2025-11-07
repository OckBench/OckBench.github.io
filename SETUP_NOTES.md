# OckBench Website Setup Notes

## What Has Been Created

### Main Files
1. **index.html** (581 lines) - The main website with all content sections
2. **README.md** - Project documentation
3. **.gitignore** - Git ignore rules

### Assets
- **static/images/ockbench-logo.svg** - Blue logo with "O" character
- **static/data/leaderboard_data.js** - Placeholder leaderboard data for 15 models
- **static/css/** - All CSS from Video-MME (Bulma framework + custom styles)
- **static/js/** - All JavaScript from Video-MME (sorting, carousel, etc.)

## Website Sections

The website includes the following sections:

1. **Hero Section**
   - OckBench logo and title
   - Subtitle: "Evaluating Accuracy and Efficiency in LLM Reasoning"
   - Links to arXiv, GitHub, Dataset, and Leaderboard

2. **Introduction**
   - Overview of the benchmark's purpose
   - Key features and challenges addressed
   - Comparison with existing benchmarks

3. **Benchmark Overview**
   - Statistics cards (1,200+ questions, 8 categories, etc.)
   - List of 8 task categories
   - Evaluation metrics explanation

4. **Leaderboard**
   - Sortable table with 15 models
   - Columns: Rank, Model, Params, Accuracy, Avg Time, Avg Tokens, Efficiency Score, Overall Score
   - Placeholder data from GPT-4o to Mistral-7B

5. **Example Tasks**
   - 4 sample problems across different categories
   - Mathematical Reasoning, Logical Inference, Code Reasoning, Strategic Reasoning
   - Each with difficulty level

6. **Key Findings**
   - 6 key research findings about accuracy-efficiency trade-offs

7. **Footer**
   - Credits and acknowledgments

## Next Steps for Customization

### 1. Update Links
Replace placeholder "#" links with actual URLs:
- arXiv paper link
- GitHub repository link
- Hugging Face dataset link

### 2. Replace Logo (Optional)
- Current logo is a simple blue square with "O"
- Replace `static/images/ockbench-logo.svg` with your custom logo

### 3. Update Statistics
In the Benchmark Overview section, replace placeholder numbers:
- Total Questions: Currently "1,200+"
- Task Categories: Currently "8"
- Models Evaluated: Currently "15+"

### 4. Update Leaderboard Data
Edit `static/data/leaderboard_data.js` with actual model results:
- Replace placeholder scores
- Add or remove models as needed
- Update the lastUpdated date

### 5. Add Real Examples
Replace the 4 example tasks with actual questions from your benchmark

### 6. Add Visualizations
- Add charts/graphs to the Benchmark Overview section
- Add example images to the Examples section
- Place images in `static/images/examples/`

### 7. Update Meta Information
In `index.html`, update:
- Author information (currently shows "NeurIPS 2025 Workshop")
- Paper publication details
- Conference/venue information

## Testing Locally

To test the website locally:

```bash
cd /home/zheng/code/OckBench.github.io
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Publishing to GitHub Pages

1. Commit all files:
```bash
git add .
git commit -m "Initial OckBench website"
```

2. Push to GitHub:
```bash
git push origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select "main" branch as source
   - The site will be published at https://USERNAME.github.io/OckBench.github.io/

## File Structure

```
OckBench.github.io/
├── index.html              # Main website
├── README.md               # Project documentation
├── .gitignore              # Git ignore rules
├── SETUP_NOTES.md          # This file
├── _Neurips2025_workshop__Razorbench-3.pdf  # Paper (can be moved or referenced)
└── static/
    ├── css/                # Bulma CSS framework + custom styles
    ├── js/                 # JavaScript for sorting, carousel, etc.
    ├── images/
    │   ├── ockbench-logo.svg
    │   └── examples/       # Add example images here
    └── data/
        └── leaderboard_data.js  # Leaderboard data
```

## Technologies Used

- **HTML5/CSS3** - Modern web standards
- **Bulma CSS Framework** - Responsive design
- **JavaScript (jQuery)** - Interactive elements
- **Font Awesome** - Icons
- **Academicons** - Academic icons (arXiv, etc.)

## Credits

This website template is based on:
- Video-MME website structure
- Nerfies template (underlying design)
- Bulma CSS framework

All placeholder data is fictional and should be replaced with actual benchmark results.

