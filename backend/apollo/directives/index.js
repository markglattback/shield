const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');
const { AuthenticationError, ForbiddenError } = require('apollo-server');

// Auth directive
class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // cache field's default resolver
    const { resolve = defaultFieldResolver } = field;
    const { permission } = this.args;

    // re-assign resolve function
    field.resolve = async function resolver(...args) {
      const [, , ctx] = args;
      const { req: { user }, cache } = ctx;
      if (!user) throw new AuthenticationError('You must be logged in to view this content');

      // check permissions
      const { roles } = user;
      if (!roles || !roles.length) throw new ForbiddenError('You are not authorized to view this content');

      let valid = false;

      const cachedRoles = cache.get('roles');

      roles.forEach((role) => {
        if (valid) return;

        if (cachedRoles[`${role}`].permissions.includes(permission)) {
          valid = true;
        }
      });

      if (!valid) throw new ForbiddenError('You are not authorized to view this content');

      const data = await resolve.apply(this, args);
      return data;
    };
  }
}

module.exports = {
  AuthDirective,
};
