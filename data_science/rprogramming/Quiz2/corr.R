corr <- function(directory, threshold = 0) {
    
    files <- list.files(directory)
    x <- numeric()
    
    for(i in files) {
        data <- read.csv(paste(directory, "/", i, sep = ""))
        n <- nrow(data[complete.cases(data),])
        
        if(n > threshold) {
            sulf <- data[complete.cases(data),"sulfate"]
            nitr <- data[complete.cases(data),"nitrate"]
            x <- c(x, cor(sulf, nitr))
        } else {
            next
        }
    }
    
    x
}