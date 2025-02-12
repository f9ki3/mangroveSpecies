from connection import Connection

class SpeciesMangrove():
    def createtableSpecies():
        with Connection() as conn:
            conn.execute('''
            CREATE TABLE IF NOT EXISTS mangrove_species(
                         id INTEGER PRIMARY KEY,
                         species_filename,
                         species_class,
                         species_status
                         )
            ''')
            print('Created table mangrove_species!')

    def insertSpecies(species_filename, species_class, species_status):
        data = species_filename, species_class, species_status
        with Connection() as conn:
            conn.execute('''
            INSERT INTO mangrove_species (species_filename, species_class, species_status)
            VALUES (?,?,?)
            ''')
            print('Insert scanned species!')

    def readAllSpecies():
        with Connection() as conn:
            data = conn.execute('''SELECT * FROM mangrove_species''').fetchall()
            
    