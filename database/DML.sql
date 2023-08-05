-------------
-- Animals --
-------------

-- Create a new Animal based on the data submitted from the addAnimal form
INSERT INTO Animals (species, animalName, diet)
VALUES (
:speciesInput,
:animalNameInput,
:dietInput
);

-- Retrieve all Animals data for the Animals table on the Animals page
SELECT * FROM Animals;

-- Retrieve all Animal names for the delete dropdown
SELECT animalName FROM Animals;

-- Update the Animal data based on the submission of the animal update form
UPDATE Animals 
SET species = :speciesInput,
animalName = :animalNameInput,
diet = :dietInput
WHERE animalID = :animalIDInput;

-- Delete the Animal that matches the variable
DELETE FROM Animals WHERE animalName = :animalNameInput;

-------------
-- Keepers --
-------------

-- Create a new Keeper based on the data submitted from the addKeeper form
INSERT INTO Keepers (keeperName)
VALUES (
:keeperNameInput
);

-- Retrieve all Keepers data for the Keepers table on the Keepers page
SELECT * FROM Keepers;

-- Retrieve all Keeper names for the delete dropdown
SELECT keeperName FROM Keepers;

-- Update the Keeper data based on the submission of the keeper update form
UPDATE Keepers 
SET keeperName = :keeperNameInput
WHERE keeperID = :keeperIDInput;

-- Delete the Keeper that matches the variable keeperNameInput
DELETE FROM Keepers WHERE keeperName = :keeperNameInput;

-----------
-- Foods --
-----------

-- Create a new Food based on the data submitted from the addFood form
INSERT INTO Foods (foodName, foodGroup)
VALUES (
:foodNameInput,
:foodGroupInput
);

-- Retrieve all Foods data for the Foods table on the Foods page
SELECT * FROM Foods;

-- Retrieve all Food names for the delete dropdown
SELECT foodName FROM Foods;

-- Update the Foods data based on the submission of the Food update form
UPDATE Foods 
SET foodName = :foodNameInput,
foodGroup = :foodGroupInput
WHERE foodID = :foodIDInput;

-- Delete the Food that matches the variable foodNameInput
DELETE FROM Foods WHERE foodName = :foodNameInput;

-------------------
-- FeedingEvents --
-------------------

-- Create a new FeedingEvent based on the data submitted from the feedingEvent form
INSERT INTO FeedingEvents (keeperID, animalID, foodID, date, time)
VALUES (
:keeperIDInput,
:animalIDInput,
:foodIDInput,
:dateInput,
:timeInput
);

-- Retrieve all FeedingEvents for the FeedingEvents table on the FeedingEvents page
SELECT * FROM FeedingEvents;

-- Retrieve all feedingEventIDs for the delete dropdown
SELECT feedingEventID FROM FeedingEvents;

-- Update the FeedingEvent based on the data submitted from the feedingEventUpdate form
UPDATE FeedingEvents 
SET keeperID = :keeperIDInput,
animalID = :animalIDInput,
foodID = :foodIDInput,
date = :dateInput,
time = :timeInput
WHERE feedingEventID = :feedingEventIDInput;

-- Delete the FeedingEvent that matches the variable feedingEventInput
DELETE FROM FeedingEvents WHERE feedingEventID = :feedingEventIDInput;
SELECT * FROM FeedingEvents;