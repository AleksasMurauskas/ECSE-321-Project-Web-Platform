import os
import time

def deploy():
    print("~~~~~~ Deploying to Heroku ~~~~~~")
    start_time = time.time()

    os.system("git subtree push --prefix Admin-Web heroku master")
    print("Deployment complete!")
    print("Deployment took %s seconds" % (time.time() - start_time))

if __name__ == "__main__":
    deploy()