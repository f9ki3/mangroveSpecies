from connection import Connection
import sqlite3
import datetime

class SpeciesMangrove():
    def createtableSpecies():
        with Connection() as conn:
            conn.execute('''
                CREATE TABLE IF NOT EXISTS mangrove_species(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date TEXT NOT NULL,
                    species_filename TEXT NOT NULL,
                    species_predicted TEXT NOT NULL,
                    species_percent TEXT NOT NULL,
                    species_status TEXT NOT NULL
                )
            ''')
            print('Created table mangrove_species!')
        
    def insertSpecies(species_filename, species_predicted, species_percent, species_status):
        date_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # Get current date-time
        data = (date_time, species_filename, species_predicted, species_percent, species_status)

        with Connection() as conn:
            conn.execute('''
                INSERT INTO mangrove_species (date, species_filename, species_predicted, species_percent, species_status)
                VALUES (?, ?, ?, ?, ?)
            ''', data)
            print('Inserted scanned species!')

    def readAllSpecies(page=1, per_page=9, search_term='', sort_column='date', sort_direction='ASC'):
        # Validate sort direction (either 'ASC' or 'DESC')
        if sort_direction not in ['ASC', 'DESC']:
            sort_direction = 'ASC'  # Default to ASC if the direction is invalid
        
        # Validate the sort column (you can specify more allowed columns)
        valid_columns = ['date', 'species_filename', 'species_predicted', 'species_percent', 'species_status']
        if sort_column not in valid_columns:
            sort_column = 'date'  # Default to sorting by date_time if the column is invalid

        # Calculate offset based on page and items per page
        offset = (page - 1) * per_page

        # Start the SQL query with a filter on the search term (allowing blank search term)
        query = f'''
            SELECT * FROM mangrove_species
            WHERE species_filename LIKE ? OR species_predicted LIKE ? OR species_status LIKE ?
            ORDER BY {sort_column} {sort_direction}
            LIMIT ? OFFSET ?
        '''

        # Parameters for the query
        search_like = f"%{search_term}%"  # Adding wildcard for partial matches
        params = (search_like, search_like, search_like, per_page, offset)

        with Connection() as conn:
            conn.row_factory = sqlite3.Row

            # Get the total number of records for pagination, considering the search term
            total_records = conn.execute('''
                SELECT COUNT(*) FROM mangrove_species
                WHERE species_filename LIKE ? OR species_predicted LIKE ? OR species_status LIKE ?
            ''', (search_like, search_like, search_like)).fetchone()[0]

            # Fetch the filtered and sorted records based on search term, sorting, and pagination
            data = conn.execute(query, params).fetchall()

            # Prepare the response with the data and pagination information
            result = {
                "total_records": total_records,
                "total_pages": (total_records + per_page - 1) // per_page,  # Calculate the total number of pages
                "current_page": page,
                "per_page": per_page,
                "sort_column": sort_column,
                "sort_direction": sort_direction,
                "data": [dict(row) for row in data]
            }

            return result




if __name__ == "__main__":
    SpeciesMangrove.createtableSpecies()
    data = SpeciesMangrove.readAllSpecies()
    print(data)