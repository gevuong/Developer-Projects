# == Schema Information
#
# Table name: actors
#
#  id   :bigint(8)        not null, primary key
#  name :string           not null
#
# Table name: castings
#
#  id       :bigint(8)        not null, primary key
#  actor_id :integer          not null
#  movie_id :integer          not null
#  ord      :integer          not null
#
# Table name: movies
#
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  yr          :integer          not null
#  score       :float            not null
#  votes       :integer          not null
#  director_id :integer          not null


def eighties_b_movies
	# List all the movies from 1980-1989 with scores falling between
	# 3 and 5 (inclusive).
	# Show the id, title, year, and score.
	Movie.select(:id, :title, :yr, :score)
		.where('yr BETWEEN 1980 AND 1989 AND score BETWEEN 3 AND 5') 
		# same as .where(yr: (1980..1989), score: (3..5))
end

def eighties_b_movies_sql
	execute(<<-SQL)
		SELECT
			id, title, yr, score 
		FROM
			movies
		WHERE 
			yr BETWEEN 1980 AND 1989 AND 
			score BETWEEN 3 AND 5
	SQL
end 

# Not 100% sure I understand how the solution solves the problem. Idk how to determine when a move was released or not.
def bad_years
	# List the years in which a movie with a rating above 8 was not released.
	# Specs want you to return an array of years, which suggests using pluck().

	# Movie.where('score > 8').pluck(:yr)
	Movie.group(:yr).having('MAX(score) < 8').pluck(:yr)
end


def cast_list(title)
	# List all the actors for a particular movie, given the title.
	# Sort the results by starring order (ord). Show the actor id and name.
	Actor.select(:id, :name)
		.joins(:movies)
		.where(movies: { title: title }) # try .where('movies.title = ?')
		.order('castings.ord') 
		# ORDER clause should be in quotes, not have key value pairs (i.e. .order('castings: ord'))

end

def cast_list_sql(them)
	execute(<<-SQL)
		SELECT
			actors.id, actors.name
		FROM
			actors
			JOIN castings
				ON castings.actor_id = actors.id
			JOIN movies 
				ON movies.id = castings.movie_id
		WHERE
			movies.title = them
		ORDER BY 
			castings.ord
	SQL
end 


def vanity_projects
	# List the title of all movies in which the director also appeared
	# as the starring actor.
	# Show the movie id and title and director's name.

	# Note: Directors appear in the 'actors' table.
	Movie.select('movies.id, movies.title, actors.name')
		.joins(:actors)
		.where('castings.ord = 1 AND movies.director_id = actors.id') # same as .where(castings: { ord: 1} )
end

def vanity_projects_sql
	execute(<<-SQL)
		SELECT
			movies.id, movies.title, actors.name
		FROM
			movies
			JOIN castings
				ON movies.id = castings.movie_id
			JOIN actors
				ON actors.id = castings.actor_id
		WHERE
			castings.ord = 1 AND
			movies.director_id = actors.id
	SQL
end 


def most_supportive
	# Find the two actors with the largest number of non-starring roles.
	# Show each actor's id, name and number of supporting roles.

	# When querying with expressions in SELECT, it's good practice to replace expression with an alias. According to specs, use alias, 'roles', when counting number of non-starring roles
	Actor.select('actors.id, actors.name, COUNT(castings.actor_id) AS roles')
		.joins(:castings)
		.where('castings.ord != 1')
		.group('actors.id') # group actors by id, that way, all the castings an actor has been in can be grouped
		.order('roles DESC')
		.limit(2)
end

def most_supportive_sql
	execute(<<-SQL)
		SELECT
			actors.id, actors.name, COUNT(castings.actor_id) AS roles
		FROM
			actors
			JOIN castings
				ON castings.actor_id = actors.id 
		WHERE 
			castings.ord != 1 
		GROUP BY
			actors.id /* can't be castings.actor_id because actors.id (specified in SELECT clause) must appear in GROUP BY clause or in an aggregate fcn */
		ORDER BY
			castings.actor_id DESC
		LIMIT
			2
	SQL
end 