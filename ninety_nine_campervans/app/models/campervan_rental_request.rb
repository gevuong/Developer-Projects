class CampervanRentalRequest < ApplicationRecord
  validates :campervan_id, :start_date, :end_date, presence: true
  validates :status, inclusion: %w(APPROVED DENIED PENDING)

  # Remember, 'belongs_to' association is a class method, where first arg is association instance method, and second arg is options hash. Also, Rails 5 auto validates association methods.
  belongs_to :campervan,
  primary_key: :id,
  foreign_key: :campervan_id,
  class_name: :Campervan

  # get all requests that overlap with the ones we are trying to validate.  Should return an ActiveRecord Relation object so we can chain more methods to it later.
  # def overlapping_requests
  #   CampervanRentalRequest.where.not(id: self.id) # current request we are trying to validate should not appear in list of #overlapping_requests.
  #   .where(campervan_id: campervan_id) # returns
  #   .where(<<-SQL, start_date: start_date, end_date: end_date)
  #     NOT( (start_date > :end_date OR end_date < :start_date) )
  #   SQL
  # end
end
