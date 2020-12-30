import tw, { css, styled, theme } from 'twin.macro'

const Button = styled.button(({ isPrimary, isSecondary, isSmall }) => [
  // The common button styles added with the tw import
  tw`text-lg px-8 py-2 rounded focus:outline-none hocus:shadow`,
  tw`transform transition-transform duration-75`,

  // Use the variant grouping feature to add variants to multiple classes
  tw`hocus:(scale-105)`,

  // Use props to conditionally style your components
  // isPrimary && tw`bg-white text-black border-black`,
  isPrimary && [
    tw`bg-dlearthy text-white border-black hocus:(text-gray-300) disabled:bg-gray-400`,
    // css`
    //   box-shadow: 0 0.1em 0 0 rgba(0, 0, 0, 0.25);
    // `,
  ],

  // Combine regular css with tailwind classes within backticks
  isSecondary && [
    // css`
    //   box-shadow: 0 0.1em 0 0 rgba(0, 0, 0, 0.25);
    // `,
    tw`border-2 border-dlearthy text-dlearthy shadow-md`,
  ],

  // Conditional props can be added
  isSmall ? tw`text-sm` : tw`text-lg`,
])

export default Button
