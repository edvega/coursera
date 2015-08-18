pollutantmean <- function(directory, pollutant, id = 1:332) {
    
    files <- list.files(directory)
    v <- numeric()
    
    for(i in files[id]) {
        data <- read.csv(paste(directory, "/", i, sep = ""))
        x <- data[complete.cases(data[pollutant]), pollutant]
        v <- c(v, x)
    }
    
    mean(v)
}