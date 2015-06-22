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

### Feature / Scenarios

Feature: Make a play  

*As a* Player  
*I want to* make a play  
*so that I* am one step closer to winning the game  

  Scenario: Successfully flag a bomb  
    *given* I am on the game board  
    *and* a game is in progress  
    *when* I right click a particular cell  
    *then* I should see a flag appear on the cell  
    *and* the cell is still in an unchecked state  

  Scenario: Click on a bomb  
    *given* I am on the game board  
    *and* a game is in progress  
    *when* I left click a cell that has a bomb underneath  
    *then* I should see the cell turned to a checked state  
    *and* the bomb will populate that cell  
    *and* the "Game Over" message will appear  
    *and* the board will be locked, with no further plays allowed  

  Scenario: Click on a cell with bomb neighbor(s)  
    *given* I am on the game board  
    *and* a game is in progress  
    *when* I left click a cell that does not have a bomb  
    *and* has at least one bomb neighbor  
    *then* I should see the cell turned to a checked state  
    *and* the number of bomb neighbors will populate that cell  

  Scenario: Click on a cell with no bomb neighbors  
    *given* I am on the game board  
    *and* a game is in progress  
    *when* I left click a cell that does not have a bomb  
    *and* has no bomb neighbors  
    *then* I should see the cell turned to a checked state  
    *and* every neighbor around that cell should be left clicked  
