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

# A note on subqueries: we can refer to values in the outer SELECT within the
# inner SELECT. We can name the tables so that we can tell the difference
# between the inner and outer versions.

def example_select_with_subquery
	execute(<<-SQL)
	SELECT
		c1.name
	FROM
		countries AS c1
	WHERE
		c1.population > (
			SELECT
				c2.population
			FROM
				countries AS c2
			WHERE
				c2.name='Romania'
		)
	SQL
end

def larger_than_russia
	# List each country name where the population is larger than 'Russia'.
	execute(<<-SQL)
		SELECT 
			c1.name 
		FROM 
			countries AS c1
		WHERE
			c1.population > (
				SELECT 
					c2.population
				FROM
					countries AS c2 
				WHERE 
					c2.name = 'Russia'
			)
	SQL
end

def richer_than_england
	# Show the countries in Europe with a per capita GDP greater than
	# 'United Kingdom'.
	execute(<<-SQL)
		SELECT 
			c1.name
		FROM
			countries AS c1 
		WHERE 
			c1.continent = 'Europe' AND 
			(c1.gdp / c1.population) > (
				SELECT 
					c2.gdp / c2.population AS per_capita_GDP
				FROM 
					countries AS c2
				WHERE
					c2.name = 'United Kingdom'
			)
	SQL
end

def neighbors_of_certain_b_countries
	# List the name and continent of countries in the continents containing
	# 'Belize', 'Belgium'.
	execute(<<-SQL)
		SELECT 
			c1.name, c1.continent
		FROM 
			countries AS c1
		WHERE 
			c1.continent IN (
				SELECT 
					c2.continent
				FROM 
					countries AS c2 
				WHERE 
					c2.name IN ('Belize', 'Belgium')
			)
	SQL
end

def population_constraint
	# Which country has a population that is more than Canada but less than
	# Poland? Show the name and the population.
	execute(<<-SQL)
		SELECT 
			c1.name, c1.population 
		FROM 
			countries AS c1
		WHERE 
			c1.population > (
				SELECT 
					c2.population
				FROM
					countries AS c2
				WHERE 
					c2.name = 'Canada'
			) AND 
			c1.population < (
				SELECT
					c2.population
				FROM
					countries AS c2
				WHERE 
					c2.name = 'Poland'
			)
	SQL
end

def sparse_continents
	# Find every country that belongs to a continent where each country's
	# population is less than 25,000,000. Show name, continent and
	# population.
	# Hint: Sometimes rewording the problem can help you see the solution.
	# In other words, find the continents where all countries have a population <= 25000000. Then find the names of the countries associated with these continents. Show name, continent and population.
	execute(<<-SQL)
		SELECT 
			c1.name, c1.continent, c1.population
		FROM 
			countries AS c1
		WHERE 
			/* initially tried IN and c2.population <= 25000000, but didnt work...need to move on */
			c1.continent NOT IN ( 
				SELECT
					c2.continent
				FROM
					countries AS c2
				WHERE
					c2.population > 25000000
			)
	SQL
end
