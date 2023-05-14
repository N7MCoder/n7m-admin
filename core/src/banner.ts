const banner = (greet: boolean = true): void => {

    let banner = `
#     # ####### #     #    #     # ### 
##    # #    #  ##   ##    #     #  #  
# #   #     #   # # # #    #     #  #  
#  #  #    #    #  #  #    #     #  #  
#   # #   #     #     #    #     #  #  
#    ##   #     #     #    #     #  #  
#     #   #     #     #     #####  ###
`
    if (greet) {
        console.log("%c " + banner, "color:blue");
        console.log("完全开源的前端UI框架~\\(≧▽≦)/~啦啦啦");
        console.log("");
    }

}

export default banner