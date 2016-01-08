DROP TABLE races;
DROP TABLE classes;
CREATE TABLE races (race TEXT, ability_score TEXT, size TEXT, speed INTEGER, traits TEXT, languages TEXT, male_names TEXT, female_names TEXT, clan_or_family_names TEXT);
CREATE TABLE classes (class TEXT, hit_dice TEXT, hp INTEGER,armor_proficiency TEXT,weapon_proficiency TEXT,tool_proficiency TEXT,saving_throws TEXT,skill TEXT,choose_skills INTEGER, starting_equipment TEXT,features TEXT, cantrips INTEGER, spells_known_or_prepared INTEGER,spell_slots INTEGER);