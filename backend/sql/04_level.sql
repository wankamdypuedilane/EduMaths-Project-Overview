-- 04_level.sql : Force Terms + Level check
-- Exécuter après 01-03

-- Add level if not exist (classe_id → level)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS level TEXT;
ALTER TABLE profiles ADD CONSTRAINT level_check CHECK (level IN ('6e','5e','4e','3e','2nde','1ere'));

-- Trigger: Set is_first_login false après level
CREATE OR REPLACE FUNCTION set_level_complete()
RETURNS TRIGGER AS $$
BEGIN
  NEW.is_first_login = false;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER level_complete_trigger
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  WHEN (OLD.level IS NULL AND NEW.level IS NOT NULL)
  EXECUTE FUNCTION set_level_complete();

-- Migrate existants (optionnel)
UPDATE profiles SET level = classe_id WHERE level IS NULL AND classe_id IS NOT NULL;

