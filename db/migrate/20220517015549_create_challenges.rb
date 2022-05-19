class CreateChallenges < ActiveRecord::Migration[6.1]
  def change
    create_table :challenges do |t|
      t.string :video
      t.string :challenge_description
      t.integer :user_id

      t.timestamps
    end
  end
end
