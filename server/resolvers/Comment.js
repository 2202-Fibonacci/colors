function postedBy(parent, args, context) {
    return context.prisma.comment.findUnique({ where: { id: parent.id } }).postedBy()
  }
  
  module.exports = {
    postedBy,
  }