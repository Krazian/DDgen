DROP TABLE races;
DROP TABLE classes;
CREATE TABLE races (race TEXT, ability_score_bonus TEXT, size TEXT, speed INTEGER, traits TEXT, languages TEXT, male_name TEXT, female_name TEXT, clan_or_family_name TEXT);
CREATE TABLE classes (class TEXT, hit_dice TEXT, hp INTEGER,armor_proficiencies TEXT,weapon_proficiencies TEXT,tool_proficiencies TEXT,saving_throws TEXT,skills TEXT,choose_skills INTEGER, starting_equipment TEXT,features TEXT, cantrips INTEGER, spells_known_or_prepared INTEGER,spell_slots INTEGER);