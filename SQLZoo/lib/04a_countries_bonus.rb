# == Schema Information
#
# Table name: countries
#
#  name        :string       not null, primary key
#  continent   :string
#  area        :integer
#  population  :integer
#  gdp         :integer

require_relative './sqlzoo.rb'

# BONUS QUESTIONS: These problems require knowledge of aggregate
# functions. Attempt them after completing section 05.

def highest_gdp
	# Which countries have a GDP greater than every country in Europe? (Give the
	# name only. Some countries may have NULL gdp values)
	execute(<<-SQL)
		SELECT 
			name
		FROM
			countries 
		GROUP BY
			name

	SQL


	# hm, lets break this problem down. First obtain all countries in Europe 
	execute(<<-SQL)
		SELECT
			name 
		FROM
			countries 
		WHERE 
			continent = 'Europe'
	SQL

	# ok, now how do we compare each country's gdp with every country's gdp in Europe?

end

p highest_gdp 

def largest_in_continent
	# Find the largest country (by area) in each continent. Show the continent,
	# name, and area.
	execute(<<-SQL)
		SELECT 
			continent, name, area 
		FROM
			countries 
		GROUP BY
			continent 
		ORDER BY 
			area DESC
		LIMIT
			1
	SQL
end

p largest_in_continent 

def large_neighbors
	# Some countries have populations more than three times that of any of their
	# neighbors (in the same continent). Give the countries and continents.
	execute(<<-SQL)
	/*	SELECT 
			name, continent 
		FROM
			countries 
		WHERE 
			population > 3 * (
				SELECT
					population
				FROM 
					countries 
				
			)*/
	SQL
end
