# frozen_string_literal: true

require "test_helper"

class PatientTest < ActiveSupport::TestCase
  test 'it is not vaild without name' do
    p = Patient.new

    assert_not p.valid?
    assert_equal p.errors[:name].first, "can't be blank"
  end

  test 'it is not vaild without age' do
    p = Patient.new

    assert_not p.valid?
    assert_equal p.errors[:age].first, "can't be blank"
  end

  test 'it is not vaild without date of entry' do
    p = Patient.new

    assert_not p.valid?
    assert_equal p.errors[:date_of_entry].first, "can't be blank"
  end

  test 'it is not vaild without gender' do
    p = Patient.new

    assert_not p.valid?
    assert_equal p.errors[:gender].first, "can't be blank"
  end

  test 'it is not valid if age does not contains only numbers' do
    p = Patient.new(age: 'veinte')

    assert_not p.valid?
    assert_equal p.errors[:age].first, 'is not a number'
  end

  test 'it is not valid if age does not contains only integer numbers' do
    p = Patient.new(age: 1.45)

    assert_not p.valid?
    assert_equal p.errors[:age].first, 'must be an integer'
  end

  test 'it is not valid if age is greater than 110 ' do
    p = Patient.new(age: 123)

    assert_not p.valid?
    assert_equal p.errors[:age].first, 'must be less than 110'
  end

  test 'it is not valid if age is lower than 0' do
    p = Patient.new(age: -3)

    assert_not p.valid?
    assert_equal p.errors[:age].first, 'must be greater than 0'
  end

  test 'it is not valid if phone number is lower or greater than 10 digits' do
    p = Patient.new(phone_number: '31231212')

    assert_not p.valid?
    assert_equal p.errors[:phone_number].first, 'is the wrong length (should be 10 characters)'
  end

  test 'it is not valid if phone number does not contain only numbers' do
    p = Patient.new(phone_number: '111111d111')

    assert_not p.valid?
    assert_equal p.errors[:phone_number].first, 'only allows numbers'
  end

  test 'it is valid with name, age, date of entry and gender' do
    d = Time.current.strftime("%d/%m/%Y %H:%M")

    p = Patient.new(name: "Urbi", age: 22, date_of_entry: d, gender: 1)

    assert p.valid?
  end

  test 'it is valid if phone number is 10 chars lenght and contains only nombers' do
    d = Time.current.strftime("%d/%m/%Y %H:%M")

    p = Patient.new(name: "Urbi", age: 22, date_of_entry: d, gender: 1, phone_number: '3414200512')

    assert p.valid?
  end
end
