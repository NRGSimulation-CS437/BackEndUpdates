# NRG

a [Sails](http://sailsjs.org) application
# NRG-BackEnd


# Install vagrant on your computer first

Download the repo and move into the repo on make sure you can see that VagrantFile and run the following commands

* Vagrant up

* vagrant ssh

after you run vagrant ssh, you should be in your vagrant ssh and this is your work environment.

anything in your vag folder will show up in the  “/vagrant” folder in the vagrant machine.
inside the vagrant machine head to it by running.

* cd /vagrant 
* ls

//after running ls you’ll notice all the files from the repo this is because all the files are saved under /vagrant and is shared with your system. blah blah blah

now time to set up sails on this baby :D


* sudo apt-get update

* sudo apt-get install python-software-properties python g++ make

* sudo apt-get install curl

* curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

* sudo apt-get install -y nodejs

// the following commands install sails

* sudo npm -g install sails
// Now I hope you are in the /vagrant directory of the file since its time to lift the sails lol…. run the following command.
* sails lift
// now use your web browser to hit the site.
url : localhost:1337

We are done…………….

# LOG INTO VAGRANT.
only if you are not in the ssh vagrant move to the directory where you have the vagrantfile and enter these commands:
* vagrant up
* vagrant ssh
 

# TO EXIT THE VAGRANT SHELL
* exit 

# TO DESTROY VAGRANT
this should only be used if you are done with the vagrant machine for good. and this is ran outside and on the directory.

* vagrant destroy
