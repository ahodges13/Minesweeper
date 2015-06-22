# Minesweeper

### User Stories

1.) Game Board Setup  
Tasks:  
 - Reuse game of life code, where possible  
 - Set up board with all cells hidden, and bombs dispersed throughout the playing field  

2.) User Interactions
Tasks:  
 - Reveal a cell when it's clicked  
 - Add ability to right click and mark a bomb  
 - Make game over when a bomb is clicked  
 - Add game over message, lock board from further play  
 - Add game won message, lock board from further play  
 - Add option to play again, if bomb is selected, or if game is won  

3.) Game Logic  
Tasks:  
 - Calculate what to show when a cell is clicked - neighboring bombs, blank or bomb  
 - If a blank cell is clicked, recursively reveal other blank cells and neighboring, non-bomb cells  
 - When last bomb is flagged, reveal entire board - since the player won  

4.) UI / UX  
Tasks:  
 - Add UI / UX styling to follow general minesweeper look and feel  
    - Flags  
    - Bombs  
    - Numbers  
    - Game Won
    - Game Over  
