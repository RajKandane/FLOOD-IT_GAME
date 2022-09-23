# FLOOD-IT_GAME

Feb 2021 - Jul 2022



Flood-It is a popular one player game on many smart phones. The player is given an n x n board of tiles where each tile is given one of 6 colours (numbered 1-6). Each tile is connected to up to 4 adjaceat tiles in the North, South, East, and West directions. A tile is connected to the origin (the tile in the upper left corner) if it has the same colour as the origin and there is a path to the origin consisting only of tiles of this colour.

A player makes a move by choosing one of the 6 colours. After the choice is made, all tiles that are connected to the origin are changed to the chosen colour. The game proceeds until all tiles have the same colour. The goal of the game is to change all the tiles to the same colour, preferably with the fewest number of moves possible.

It has been proven that finding the optimal moves is a very hard problem. For this problem, you will simulate a very simple greedy strategy to see how well it works:

1. for each move, choose the colour that will result in the largest number of tiles connected to

origin:

2. if there is a tie, break ties by choosing the lowest numbered colour.
