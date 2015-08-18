complete <- function(directory, id = 1:332) {
    
    files <- list.files(directory)
    nobs <- numeric()
    
    for(i in files[id]) {
        data <- read.csv(paste(directory, "/", i, sep = ""))
        nobs <- c(nobs, nrow(data[complete.cases(data),]))
    }
    data.frame(id, nobs)
}