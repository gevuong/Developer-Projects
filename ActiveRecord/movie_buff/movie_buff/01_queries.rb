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

def it_was_ok
	# Consider the following:
	# Movie.where(yr: 1970..1979)
	# We can use ranges (a..b) inside a where method.
	#
	# Find the id, title, and score of all movies with scores between 2 and 3
	Movie.select('movies.id, movies.title, movies.score') # same as .select(:id, :title, :score)
		.where('score BETWEEN 2 AND 3') # same as .where(score: 2..3)
end

def harrison_ford
	# Consider the following:
	# Actor
	#   .joins(:movies)
	#   .where(movies: { title: 'Blade Runner' })
	#
	# It's possible to join based on active record relations defined in models.
	#
	# Find the id and title of all movies in which Harrison Ford appeared but not as a lead actor
	Movie.select(:id, :title)
		.joins(:actors)
		.where("actors.name = 'Harrison Ford'") # .where(actors: { name: 'Harrison Ford' })
		.where('castings.ord != 1') # same as .where.not(castings: { ord: 1 })
end

# def harrison_ford_sql
# 	execute(<<-SQL)
# 		SELECT
# 			movies.id, movies.title
# 		FROM
# 			movies
# 			JOIN castings
# 				ON castings.movie_id = movies.id
# 			JOIN actors
# 				ON actors.id = castings.actor_id 
# 		WHERE
# 			actors.name = 'Harrison Ford' AND
# 			castings.ord != 1
# 	SQL
# end 

def biggest_cast
	# Consider the following:
	# Actor
	#   .joins(:movies)
	#   .group('actors.id')
	#   .order('COUNT(movies.id) DESC')
	#   .limit(1)
	#
	# Sometimes we need to use aggregate SQL functions like COUNT, MAX, and AVG.
	# Often these are combined with group.
	#
	# Find the id and title of the 3 movies with the
	# largest casts (i.e most actors)
	Movie.select(:id, :title)
		.joins(:actors)
		.group('movies.id') # GROUP clause should not have key-value pairs
		.order('COUNT(actors.id) DESC') # ORDER clause should be in quotes and not have key-value pairs
		.limit(3)
end

# def biggest_cast_sql
# 	execute(<<-SQL)
# 		SELECT
# 			id, title
# 		FROM
# 			movies
# 			JOIN castings
# 				ON castings.movie_id = movies.id 
# 			JOIN actors 
# 				ON actors.id = castings.actor_id 
# 		GROUP BY
# 			movies.id
# 		ORDER BY 
# 			COUNT(actors.id) DESC
# 		LIMIT 
# 			3
# 	SQL
# end 

def directed_by_one_of(them)
	# Consider the following:
	# Movie.where('yr IN (?)', years)
	# We can use IN to test if an element is present in an array.
	#
	# ActiveRecord gives us an even better way to write this:
	# Movie.where(yr: years)
	#
	# Find the id and title of all the movies directed by one of 'them'.
	Movie.select(:id, :title)
		.joins(:director)
		.where(actors: { name: them })
end

# def directed_by_one_of_sql(them)
# 	execute(<<-SQL)
# 		SELECT
# 			id, title
# 		FROM
# 			movies
# 			JOIN actors
# 				ON actors.id = movies.director_id
# 		WHERE
# 			actors.name IN ('George Lucas', 'Steven Spielberg')
# 	SQL
# end 

def movie_names_before_1940
	# Consider the following:
	#
	# Movie.where('score < 2.0').pluck(:title)
	# => ['Police Academy: Mission to Moscow']
	#
	# Pluck works similarly to select, except that it converts a query result
	# directly into a Ruby Array instead of an ActiveRecord object. This can
	# improve performace for larger queries.
	#
	# Find the title of all movies made before 1940 (Hint: use #pluck)
	# (i.e. ["Wizard of Oz, The",
	# 	   "Gone with the Wind"]
	# )

	Movie.where('yr < 1940')
		.pluck(:title)

	# the following returns an array of Movie instances with title: 
	# (i.e. [#<Movie:0x007feee28d31e0 id: nil, title: "Wizard of Oz, The">,
	# 		<Movie:0x007feee28d3078 id: nil, title: "Gone with the Wind">]
	# )

	# Movie.select(:title)
	# 	.where('yr < 1940')
end
