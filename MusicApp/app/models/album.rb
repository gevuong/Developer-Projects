# == Schema Information
#
# Table name: albums
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  year       :integer          not null
#  band_id    :integer          not null
#  live       :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Album < ApplicationRecord
    validates :live, inclusion: { in: %w(true false) }
    validates :title,
        presence: true,
        uniqueness: { scope: :band_id, message: "band must have unique album title" },
        format: { with: /[a-zA-Z0-9]/, message: "can only be letters and numbers" }
    validates :year,
        presence: true,
        length: { is: 4 },
        numericality: { only_integer: true }

    validate :year_not_in_future

    belongs_to :artist

    def set_default
        self.live ||= false
    end

    def year_not_in_future
        current_year = DateTime.now.strftime("%Y").to_i
        errors[:year] = ["Are you from the future?"] if year > current_year
    end

end
