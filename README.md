# FLOOD-IT_GAME

Feb 2021 - Jul 2022

## FLOOD-IT GAME DEMO

<div align="center">
  <p>Check out the FLOOD-IT GAME in action on YouTube:</p>
  <a href="https://youtu.be/2vAjG2BSlO8">
    <img src="https://img.youtube.com/vi/2vAjG2BSlO8/0.jpg" alt="FLOOD-IT GAME">
  </a>
</div>

## FLOOD-IT GAME SCREENSHOT 

![Game Screenshot 1](Screenshot/Screenshot%20(60).png)
![Game Screenshot 2](Screenshot/Screenshot%20(61).png)
![Game Screenshot 3](Screenshot/Screenshot%20(62).png)
![Game Screenshot 4](Screenshot/Screenshot%20(63).png)


## Introduction

Flood-It_Game is a popular one-player puzzle game played on many smartphones. The player is presented with an n x n board of tiles, each assigned one of six colors (numbered 1-6). The goal is to change all the tiles to the same color, starting from the upper-left corner, preferably using the fewest number of moves.

The game follows a simple greedy strategy, where the player chooses the color that results in the largest number of tiles connected to the origin (the upper-left corner). In case of a tie, the player selects the lowest numbered color.

## Gameplay

1. The game starts with an n x n board of tiles, each colored with digits 1-6.
2. The player makes a move by choosing one of the six colors.
3. After the move, all tiles connected to the origin with the chosen color are changed to that color.
4. The game continues until all tiles have the same color.

## Input

The input consists of multiple test cases. The first line of input is a single integer, not more than 20, indicating the number of test cases to follow. Each case starts with a line containing the integer n (1 ≤ n ≤ 20). The next n lines each contain n characters, representing the initial colors of the n x n board of tiles. Each color is specified by a digit from 1 to 6.

## Output

For each case, the program displays two lines of output. The first line specifies the number of moves needed to change all the tiles to the same color. The second line specifies 6 integers separated by a single space. The ith integer gives the number of times color i is chosen as a move in the game.

## Getting Started

To play the Flood-It_Game, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Install any necessary dependencies: `pip install -r requirements.txt`
3. Run the game: `python game.py`

## Directory Structure

- /data             # Directory for storing datasets (if applicable)
    - dataset.csv   # Sample dataset for the project (example filename)

- /notebooks        # Jupyter Notebooks for data analysis and model development
    - analysis.ipynb    # Notebook for data analysis
    - model_training.ipynb   # Notebook for model development

- /src              # Source code and scripts
    - data_processing.py   # Python script for data processing
    - model.py             # Python script containing the machine learning model
    - utils.py             # Python script with utility functions

- /images           # Images used in the README or notebooks
    - plot_1.png      # Sample plot or visualization image
    - plot_2.png      # Another sample plot or visualization image

- /output           # Directory for storing output files (if applicable)
    - predictions.csv    # Sample output file with model predictions

- README.md         # Project's README file
- requirements.txt  # List of required Python packages and their versions
- LICENSE           # License file for the project

## Sample Input/Output

Sample input and output for test cases are provided in the [Sample_Input_Output.md](Logic) file.

## Contribution Guidelines

If you wish to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m "Add your message"`
4. Push to the branch: `git push origin feature/your-feature`
5. Create a pull request detailing your changes.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contact Information

For any inquiries or feedback regarding the project, you can contact me at:

- LinkedIn: [RITESHKUMAR KANDANE](https://www.linkedin.com/in/dkteriteshkumarkandane/)

---

Happy Gaming! 🎮


