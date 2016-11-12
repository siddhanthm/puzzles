import unittest
import json
from dateutil import parser

class Test_Json(unittest.TestCase):

    def test_json_data(self):
        data = open("data.json")
        parsed_data = json.load(data)

        self.assertEquals(parsed_data["name"], "Shah Rukh Knan")
        self.assertEquals(parsed_data["phonenumber"],  "217-607-3452")
        self.assertEquals(parsed_data["username"], "srk")
        self.assertEquals(parsed_data["emailid"], "srk@gmail.com")
        self.assertEquals(parsed_data["github"], "https://github.com/srk")
        self.assertEquals(parsed_data["linkedin"], "https://linkedin.com/srk")
        self.assertEquals(len(parsed_data["skills"]), 5)

        # test education
        self.assertEquals(len(parsed_data["education"]), 1)
        self.assertEquals(parsed_data["education"][0]["name"], "UIUC")
        self.assertEquals(parsed_data["education"][0]["startDate"], str(parser.parse("May 23 2013")))
        self.assertEquals(parsed_data["education"][0]["endDate"], str(parser.parse("May 23 2017")))
        self.assertEquals(parsed_data["education"][0]["CGPA"], "3.8")

        # test projects
        self.assertEquals(len(parsed_data["projects"]), 3)
        self.assertEquals(parsed_data["projects"][0]["name"], "Sudoku")
        self.assertEquals(parsed_data["projects"][1]["name"], "Touristy")
        self.assertEquals(parsed_data["projects"][2]["name"], "Classroom")

        self.assertEquals(parsed_data["projects"][0]["description"], "Enables a user to figure out all possible solutions of a given sudoku grid.")
        self.assertEquals(parsed_data["projects"][1]["description"], "This project helps the users to figure the best places to visit in a whichever location they wish to using crowd sourced data.")
        self.assertEquals(parsed_data["projects"][2]["description"], "Allows users to interact with their teachers and fellow classmates on a single platform.")

        # test internships
        self.assertEquals(len(parsed_data["internship"]), 3)
        self.assertEquals(parsed_data["internship"][0]["company"], "Google")
        self.assertEquals(parsed_data["internship"][1]["company"], "Facebook")
        self.assertEquals(parsed_data["internship"][2]["company"], "Microsoft")

        self.assertEquals(parsed_data["internship"][0]["description"], "I am currently working at Google and am a part of a wonderful team that has been working on Pixel phones.")
        self.assertEquals(parsed_data["internship"][1]["description"], "I interned at Facebook from May'2016 to August'2016 and had the wonderful opportunity to work on the news-feed.")
        self.assertEquals(parsed_data["internship"][2]["description"], "I interned at Microsoft from May'2015 to August'2015 and was actively working on the azure team.")

if __name__ == "__main__":
    unittest.main()