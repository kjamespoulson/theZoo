-- Group 55
-- Justice O'neel & James Poulson

-------------
-- Animals --
-------------

-- Create Animals Table

CREATE TABLE Animals (
    animalID int NOT NULL AUTO_INCREMENT,
    species varchar(45) NOT NULL,
    animalName varchar(45) DEFAULT NULL,
    diet varchar(45) NOT NULL,
    PRIMARY KEY (animalID)
);

-- Sample Animals 

INSERT INTO Animals (species, animalName, diet)
VALUES ('tiger', 'Tony', 'meat'),
('hippo', 'Gustav', 'fruits, vegetables'),
('penguin', 'Perry', 'fish'),
('polar bear', 'Louis', 'meat');

-------------
-- Keepers --
-------------

-- Create Keepers Table

CREATE TABLE Keepers (
    keeperID int AUTO_INCREMENT NOT NULL,
    keeperName varchar(45) NOT NULL,
    PRIMARY KEY (keeperID)
);

-- Sample Keepers

INSERT INTO Keepers (keeperName)
VALUES ('Steve Irwin'),
('Casey Anderson'),
('Jimi Hendrix'),
('Mike Tyson');

-----------
-- Foods --
-----------

-- Create Foods Table

CREATE TABLE Foods (
    foodID int AUTO_INCREMENT NOT NULL,
    foodName varchar(45) NOT NULL,
    foodGroup varchar(45) NOT NULL,
    PRIMARY KEY (foodID)
);

-- Sample Foods 

INSERT INTO Foods (foodName, foodGroup)
VALUES ('chicken', 'meat'),
('oats', 'grain'),
('lettuce', 'vegetable'),
('salmon', 'fish'),
('banana', 'fruit');

--------------------
-- Feeding Events --
--------------------

-- Create FeedingEvents Table

CREATE TABLE FeedingEvents (
    feedingEventID int AUTO_INCREMENT NOT NULL,
    date date NOT NULL,
    time time NOT NULL,
    foodID int,
    animalID int NOT NULL,
    keeperID int NOT NULL,
    PRIMARY KEY (feedingEventID),
    FOREIGN KEY (foodID) REFERENCES Foods(foodID) ON DELETE CASCADE,
    FOREIGN KEY (animalID) REFERENCES Animals(animalID) ON DELETE CASCADE,
    FOREIGN KEY (keeperID) REFERENCES Keepers(keeperID) ON DELETE CASCADE
);

-- Sample FeedingEvents 

INSERT INTO FeedingEvents (foodID, animalID, keeperID, date, time)
VALUES (1, 1, 1, '20230717', '6:0:0'),
(2, 2, 2, '20230717', '6:0:34'),
(3, 3, 3, '20230717', '6:30:58'),
(4, 4, 4,'20230717', '12:59:14'),
(1, 2, 3, '20230717', '16:4:49'),
(3, 2, 1, '20230717', '20:5:26');


