import json
from dateutil import parser



# Add user
sample_data = dict()

# Add name
sample_data["name"] = "Shah Rukh Knan"

# Add phone number
sample_data["phonenumber"] = "217-607-3452"

# Add User Name
sample_data["username"] = "srk"

# Add email id
sample_data["emailid"] = "srk@gmail.com"

# Add github
sample_data["github"] = "https://github.com/srk"

# Add linkedin
sample_data["linkedin"] = "https://linkedin.com/srk"

# Add Skills
skills = ["HTML", "JAVA", "Python", "C++", "CSS"]
sample_data["skills"] = skills

# Add Education
education = []

# First Education
edu1 = dict()
edu1["name"] = "UIUC"
edu1["startDate"] = str(parser.parse("May 23 2013"))
edu1["endDate"] = str(parser.parse("May 23 2017"))
edu1["CGPA"] = "3.8"
edu1["courses"] = ["CS125", "CS225", "CS241", "CS242", "CS374"]
education.append(edu1)


sample_data["education"] = education

# Add Projects
projects = []

# First Project
p1 = dict()
p1["description"] = "Enables a user to figure out all possible solutions of a given sudoku grid."
p1["name"] = "Sudoku"
p1["link"] = "www.sudoku.com"
p1["github"] = "www.github.com/siddhanthm/sudoku"
p1["skills"] = ["JAVA", "Python"]
projects.append(p1)

p2 = dict()
p2["description"] = "This project helps the users to figure the best places to visit in a whichever location they wish to using crowd sourced data."
p2["name"] = "Touristy"
p2["link"] = "www.sudoku.com"
p2["github"] = "www.github.com/siddhanthm/sudoku"
p2["skills"] = ["JAVA", "Python"]
projects.append(p2)

p3 = dict()
p3["description"] = "Allows users to interact with their teachers and fellow classmates on a single platform."
p3["name"] = "Classroom"
p3["link"] = "www.sudoku.com"
p3["github"] = "www.github.com/siddhanthm/sudoku"
p3["skills"] = ["JAVA", "Python"]
projects.append(p3)


sample_data["projects"] = projects


# Add Internship
internship = []

# First Internship
I1 = dict()
I1["description"] = "I am currently working at Google and am a part of a wonderful team that has been working on Pixel phones."
I1["company"] = "Google"
I1["startDate"] = str(parser.parse("May 23 2015"))
I1["endDate"] = str(parser.parse("Aug 23 2015"))
I1["skills"] = ["HTML", "JAVA"]
internship.append(I1)

I2 = dict()
I2["description"] = "I interned at Facebook from May'2016 to August'2016 and had the wonderful opportunity to work on the news-feed."
I2["company"] = "Facebook"
I2["startDate"] = str(parser.parse("May 23 2015"))
I2["endDate"] = str(parser.parse("Aug 23 2015"))
I2["skills"] = ["HTML", "JAVA"]
internship.append(I2)

I3 = dict()
I3["description"] = "I interned at Microsoft from May'2015 to August'2015 and was actively working on the azure team."
I3["company"] = "Microsoft"
I3["startDate"] = str(parser.parse("May 23 2015"))
I3["endDate"] = str(parser.parse("Aug 23 2015"))
I3["skills"] = ["HTML", "JAVA"]
internship.append(I3)


sample_data["internship"] = internship

target = open("data.json", "w")
target.write(json.dumps(sample_data))
target.close()

