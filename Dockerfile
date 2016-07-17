#ORB-CLIENT

FROM kbhit/orangebox-client
ADD . /app
WORKDIR /app
RUN npm install --no-bin-links
RUN grunt build
CMD grunt serve