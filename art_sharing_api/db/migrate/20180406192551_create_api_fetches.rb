class CreateApiFetches < ActiveRecord::Migration[5.1]
  def change
    create_table :api_fetches do |t|

      t.timestamps
    end
  end
end
