// WARNING: Read the README before editing this file.
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'ensure all image types have an altText field',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create: function (context) {
    // WARNING: Read the README before editing this file.
    return {
      Property(node) {
        const errorInCurrentNode = {
          node,
          message: `Field of type 'image' must have 'imageAltText' in its 'fields' array.\n 
             NOTE: There are legitimate cases when an image field does not need alt text (e.g. an icon),
             so it is fully expected that this rule will sometimes be disabled with 'eslint-disable-next-line'.`,
        }

        if (!(node.key.name === 'type' && node.value.value === 'image')) return

        const fieldsProperty = node.parent.properties.find((p) => p.key.name === 'fields')
        if (!fieldsProperty) {
          context.report(errorInCurrentNode)
          return
        }

        const fieldsArray = fieldsProperty.value.elements
        if (!fieldsArray) {
          context.report(errorInCurrentNode)
          return
        }

        /**
         * e.g.
         * {
         *   type: 'image',
         *   name: 'someImageFieldName',
         *   fields: [imageAltText] // defined in schemas/fields/imageAltText.ts
         * }
         */
        const hasReferenceToPredefinedImageAltTextField = fieldsArray.some((element) => {
          return element.type === 'Identifier' && element.name === 'imageAltText'
        })
        if (!hasReferenceToPredefinedImageAltTextField) {
          context.report(errorInCurrentNode)
        }
      },
    }
  },
}
