/**
 * @typedef {Object} Scheduler
 * @property {Object} data - Scheduler data
 * @property {number} data.id - Scheduler ID
 * @property {Object} data.attributes - Scheduler attributes
 * @property {string} data.attributes.Name - Scheduler name
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 * @property {string|null} data.attributes.Time - Scheduler time
 * @property {boolean} data.attributes.isRendering - Whether currently rendering
 * @property {boolean} data.attributes.Queued - Whether queued for rendering
 * @property {Object} data.attributes.days_of_the_week - Days of the week data
 * @property {Object} data.attributes.days_of_the_week.data - Day data
 * @property {number} data.attributes.days_of_the_week.data.id - Day ID
 * @property {Object} data.attributes.days_of_the_week.data.attributes - Day attributes
 * @property {string} data.attributes.days_of_the_week.data.attributes.Name - Day name
 */

/**
 * @typedef {Object} AccountType
 * @property {Object} data - Account type data
 * @property {number} data.id - Account type ID
 * @property {Object} data.attributes - Account type attributes
 * @property {string} data.attributes.Name - Account type name (e.g., "Club")
 */

/**
 * @typedef {Object} Association
 * @property {number} id - Association ID
 * @property {Object} attributes - Association attributes
 * @property {string} attributes.Name - Association name
 * @property {string} attributes.updatedAt - Last update timestamp
 * @property {string} attributes.publishedAt - Publication timestamp
 * @property {string} attributes.PlayHQID - PlayHQ identifier
 * @property {string} attributes.href - Association URL
 * @property {string} attributes.ParentLogo - Parent logo URL
 * @property {Object} attributes.website - Website information
 * @property {Object} attributes.location - Location information
 * @property {Array} attributes.contactDetails - Contact details array
 * @property {boolean} attributes.hasPlayhqLogoStored - Whether logo is stored
 * @property {string} attributes.Sport - Sport type
 * @property {string} attributes.updateAssociationCompetitions - Update date
 * @property {string|null} attributes.updateLogo - Logo update date
 * @property {Object} attributes.trial_instance - Trial instance data
 * @property {Object} attributes.Logo - Association logo
 */

/**
 * @typedef {Object} Club
 * @property {number} id - Club ID
 * @property {Object} attributes - Club attributes
 * @property {string} attributes.Name - Club name
 * @property {string} attributes.updatedAt - Last update timestamp
 * @property {string} attributes.publishedAt - Publication timestamp
 * @property {string} attributes.PlayHQID - PlayHQ identifier
 * @property {string} attributes.href - Club URL
 * @property {string} attributes.ParentLogo - Parent logo URL
 * @property {string|null} attributes.website - Website URL
 * @property {Object|null} attributes.location - Location information
 * @property {Object|null} attributes.contactDetails - Contact details
 * @property {boolean} attributes.hasPlayhqLogoStored - Whether logo is stored
 * @property {string} attributes.Sport - Sport type
 * @property {string} attributes.updateRelationalLookup - Update date
 * @property {string|null} attributes.updateLogo - Logo update date
 * @property {Object|null} attributes.trial_instance - Trial instance data
 * @property {Object} attributes.Logo - Club logo
 */

/**
 * @typedef {Object} ImageFormat
 * @property {string} name - Image name
 * @property {string} hash - Image hash
 * @property {string} ext - File extension
 * @property {string} mime - MIME type
 * @property {string|null} path - File path
 * @property {number} width - Image width
 * @property {number} height - Image height
 * @property {number} size - File size in KB
 * @property {number} sizeInBytes - File size in bytes
 * @property {string} url - Image URL
 */

/**
 * @typedef {Object} ImageData
 * @property {number} id - Image ID
 * @property {Object} attributes - Image attributes
 * @property {string} attributes.name - Image name
 * @property {string|null} attributes.alternativeText - Alt text
 * @property {string|null} attributes.caption - Image caption
 * @property {number} attributes.width - Image width
 * @property {number} attributes.height - Image height
 * @property {Object} attributes.formats - Image formats
 * @property {ImageFormat} attributes.formats.thumbnail - Thumbnail format
 * @property {ImageFormat} [attributes.formats.small] - Small format
 * @property {ImageFormat} [attributes.formats.medium] - Medium format
 * @property {ImageFormat} [attributes.formats.large] - Large format
 * @property {string} attributes.hash - Image hash
 * @property {string} attributes.ext - File extension
 * @property {string} attributes.mime - MIME type
 * @property {number} attributes.size - File size in KB
 * @property {string} attributes.url - Image URL
 * @property {string|null} attributes.previewUrl - Preview URL
 * @property {string} attributes.provider - Storage provider
 * @property {Object|null} attributes.provider_metadata - Provider metadata
 * @property {string} attributes.updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} Theme
 * @property {string} primary - Primary color hex code
 * @property {string} secondary - Secondary color hex code
 * @property {string} dark - Dark color hex code
 * @property {string} white - White color hex code
 */

/**
 * @typedef {Object} ThemeData
 * @property {Object} data - Theme data
 * @property {number} data.id - Theme ID
 * @property {Object} data.attributes - Theme attributes
 * @property {string} data.attributes.Name - Theme name
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 * @property {Theme} data.attributes.Theme - Theme colors
 * @property {number} data.attributes.CreatedBy - Creator ID
 * @property {boolean} data.attributes.isPublic - Whether theme is public
 */

/**
 * @typedef {Object} TemplateMode
 * @property {Object} data - Template mode data
 * @property {number} data.id - Template mode ID
 * @property {Object} data.attributes - Template mode attributes
 * @property {string} data.attributes.Name - Mode name
 * @property {string} data.attributes.slug - Mode slug
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 */

/**
 * @typedef {Object} TemplatePattern
 * @property {Object} data - Template pattern data
 * @property {number} data.id - Pattern ID
 * @property {Object} data.attributes - Pattern attributes
 * @property {string} data.attributes.name - Pattern name
 * @property {string} data.attributes.patternType - Pattern type
 * @property {string} data.attributes.animation - Animation type
 * @property {number} data.attributes.scale - Pattern scale
 * @property {number} data.attributes.rotation - Pattern rotation
 * @property {number} data.attributes.opacity - Pattern opacity
 * @property {number} data.attributes.animationDuration - Animation duration
 * @property {number} data.attributes.animationSpeed - Animation speed
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 */

/**
 * @typedef {Object} TemplateParticle
 * @property {Object} data - Template particle data
 * @property {number} data.id - Particle ID
 * @property {Object} data.attributes - Particle attributes
 * @property {string} data.attributes.name - Particle name
 * @property {string} data.attributes.particleType - Particle type
 * @property {string} data.attributes.particleCount - Particle count
 * @property {number} data.attributes.speed - Particle speed
 * @property {string} data.attributes.direction - Particle direction
 * @property {string} data.attributes.animationType - Animation type
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 */

/**
 * @typedef {Object} TemplateNoise
 * @property {Object} data - Template noise data
 * @property {number} data.id - Noise ID
 * @property {Object} data.attributes - Noise attributes
 * @property {string} data.attributes.name - Noise name
 * @property {string} data.attributes.noiseType - Noise type
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 */

/**
 * @typedef {Object} TemplateImage
 * @property {Object} data - Template image data
 * @property {number} data.id - Image ID
 * @property {Object} data.attributes - Image attributes
 * @property {string} data.attributes.name - Image name
 * @property {string} data.attributes.animationType - Animation type
 * @property {string} data.attributes.animationDirection - Animation direction
 * @property {string} data.attributes.overlayStyle - Overlay style
 * @property {string} data.attributes.gradientType - Gradient type
 * @property {number} data.attributes.overlayOpacity - Overlay opacity
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 */

/**
 * @typedef {Object} TemplateGradient
 * @property {Object} data - Template gradient data
 * @property {number} data.id - Gradient ID
 * @property {Object} data.attributes - Gradient attributes
 * @property {string} data.attributes.name - Gradient name
 * @property {string} data.attributes.type - Gradient type
 * @property {string} data.attributes.direction - Gradient direction
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 */

/**
 * @typedef {Object} TemplatePalette
 * @property {Object} data - Template palette data
 * @property {number} data.id - Palette ID
 * @property {Object} data.attributes - Palette attributes
 * @property {string} data.attributes.name - Palette name
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 * @property {string} data.attributes.value - Palette value
 */

/**
 * @typedef {Object} AudioOption
 * @property {number} id - Audio option ID
 * @property {Object} attributes - Audio option attributes
 * @property {string} attributes.Name - Audio option name
 * @property {string} attributes.updatedAt - Last update timestamp
 * @property {string} attributes.publishedAt - Publication timestamp
 * @property {string} attributes.URL - Audio URL
 * @property {string} attributes.CompositionID - Composition identifier
 * @property {string} attributes.ComponentName - Component name
 */

/**
 * @typedef {Object} BundleAudio
 * @property {Object} data - Bundle audio data
 * @property {number} data.id - Bundle audio ID
 * @property {Object} data.attributes - Bundle audio attributes
 * @property {string} data.attributes.Name - Bundle audio name
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 * @property {Object} data.attributes.audio_options - Audio options
 * @property {Object} data.attributes.audio_options.data - Audio options data
 * @property {Array<AudioOption>} data.attributes.audio_options.data - Audio options array
 */

/**
 * @typedef {Object} TemplateCategory
 * @property {Object} data - Template category data
 * @property {number} data.id - Category ID
 * @property {Object} data.attributes - Category attributes
 * @property {string} data.attributes.Name - Category name (e.g., "Basic")
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 * @property {string} data.attributes.slug - Category slug (e.g., "Basic")
 * @property {Object} data.attributes.divideFixturesBy - Fixture division settings
 * @property {BundleAudio} data.attributes.bundle_audio - Associated audio bundle
 */

/**
 * @typedef {Object} TemplateOption
 * @property {Object} data - Template option data
 * @property {number} data.id - Template option ID
 * @property {Object} data.attributes - Template option attributes
 * @property {string} data.attributes.updatedAt - Last update timestamp
 * @property {string} data.attributes.publishedAt - Publication timestamp
 * @property {string} data.attributes.useBackground - Background type (e.g., "Pattern")
 * @property {TemplateMode} data.attributes.template_mode - Template mode settings
 * @property {TemplatePattern} data.attributes.template_pattern - Template pattern settings
 * @property {TemplateParticle} data.attributes.template_particle - Template particle settings
 * @property {TemplateNoise} data.attributes.template_noise - Template noise settings
 * @property {TemplateImage} data.attributes.template_image - Template image settings
 * @property {TemplateGradient} data.attributes.template_gradient - Template gradient settings
 * @property {TemplatePalette} data.attributes.template_palette - Template palette settings
 * @property {TemplateCategory} data.attributes.template_category - Template category data
 */

/**
 * @typedef {Object} DataCollection
 * @property {number} id - Data collection ID
 * @property {Object} attributes - Data collection attributes
 * @property {string} attributes.whenWasTheLastCollection - Last collection timestamp
 * @property {string} attributes.updatedAt - Last update timestamp
 * @property {string} attributes.publishedAt - Publication timestamp
 * @property {number} attributes.TimeTaken - Time taken for collection
 * @property {number} attributes.MemoryUsage - Memory usage
 * @property {boolean} attributes.hasError - Whether collection had errors
 * @property {Object} attributes.processingTracker - Processing tracker data
 */

/**
 * @typedef {Object} UserAccount
 * @property {string} updatedAt - Last update timestamp
 * @property {string} publishedAt - Publication timestamp
 * @property {boolean} isActive - Whether account is active
 * @property {string} FirstName - Account first name
 * @property {string|null} LastName - Account last name
 * @property {string} DeliveryAddress - Delivery address (email)
 * @property {boolean} isSetup - Whether account is set up
 * @property {boolean} isUpdating - Whether account is updating
 * @property {boolean} hasCompletedStartSequence - Whether start sequence completed
 * @property {boolean} isRightsHolder - Whether user is rights holder
 * @property {boolean} isPermissionGiven - Whether permission is given
 * @property {boolean} group_assets_by - Whether to group assets
 * @property {string} Sport - Sport type (e.g., "Cricket")
 * @property {boolean} hasCustomTemplate - Whether user has custom template
 * @property {boolean} include_junior_surnames - Whether to include junior surnames
 * @property {Scheduler} scheduler - Scheduler data
 * @property {AccountType} account_type - Account type data
 * @property {Object} associations - Associations data
 * @property {Array<Association>} associations.data - Associations array
 * @property {Object} clubs - Clubs data
 * @property {Array<Club>} clubs.data - Clubs array
 * @property {ThemeData} theme - Theme data
 * @property {Object} orders - Orders data
 * @property {Array} orders.data - Orders array
 * @property {Object} sponsors - Sponsors data
 * @property {Array} sponsors.data - Sponsors array
 * @property {Object|null} subscription_tier - Subscription tier data
 * @property {Object} account_media_libraries - Media libraries data
 * @property {Array} account_media_libraries.data - Media libraries array
 * @property {Object} data_collections - Data collections data
 * @property {Array<DataCollection>} data_collections.data - Data collections array
 * @property {TemplateOption} template_option - Template option data
 */

/**
 * @typedef {Object} PreviewObject
 * @property {Theme|null} theme - Theme data
 * @property {TemplateOption|null} template_option - Template option data
 * @property {Array} sponsors - Sponsors array
 * @property {Array} account_media_libraries - Media libraries
 * @property {Object} Account - Account information
 */

/**
 * @typedef {Object} Asset
 * @property {string} Title - Asset title
 * @property {Array<string>} TitleSplit - Split title array
 * @property {string} CompositionID - Composition identifier
 * @property {string} VideoTitle - Video title
 */

/**
 * @typedef {Object} VideoData
 * @property {string} Title - Video title
 * @property {Array<string>} TitleSplit - Split title array
 * @property {string|boolean} CompositionID - Composition identifier
 * @property {string|boolean} VideoTitle - Video title
 * @property {string} Template - Template category
 * @property {Object} TemplateVariation - Template variation settings
 * @property {Theme} Theme - Theme colors
 * @property {boolean} includeSponsors - Whether to include sponsors
 * @property {Object} HeroImage - Hero image data
 * @property {string|boolean} audio_option - Audio option URL
 * @property {Array<number>} FRAMES - Frame array
 */

/**
 * @typedef {Object} ClubData
 * @property {string} Name - Club name
 * @property {string} Sport - Sport type
 * @property {Object} Logo - Club logo
 * @property {Array<Object>} Sponsors - Formatted sponsors array
 */

/**
 * @typedef {Object} MockDataItem
 * @property {Object} component - Component reference
 * @property {Object} data - Mock data object
 * @property {Object} data.RENDER - Render data
 * @property {Object} data.ACCOUNT - Account data
 * @property {Object} data.ASSET - Asset data
 * @property {Object} data.VIDEOMETA - Video metadata
 * @property {VideoData} data.VIDEOMETA.Video - Video data
 * @property {ClubData} data.VIDEOMETA.Club - Club data
 * @property {Object} data.TIMINGS - Timing data
 * @property {Array} data.DATA - Asset data array
 * @property {Array} data.PROMPT - Prompt data
 */

/**
 * @typedef {Object} Template
 * @property {number} id - Template ID
 * @property {Object} attributes - Template attributes
 * @property {string} attributes.name - Template name
 * @property {string} attributes.Category - Template category
 * @property {string} attributes.FrontEndName - Template frontend name
 * @property {string} attributes.description - Template description
 * @property {boolean} attributes.public - Whether template is public
 * @property {boolean} attributes.onlyClub - Whether template is club-only
 * @property {boolean} attributes.requiresMedia - Whether template requires media
 * @property {Object} attributes.Poster - Template poster image
 * @property {Object} attributes.Gallery - Template gallery
 * @property {Object} attributes.Video - Template video
 * @property {Object} attributes.bundle_audio - Template audio bundle
 * @property {Object} attributes.TemplateVariation - Template variation settings
 */

/**
 * @typedef {Object} DashboardAssetsProps
 * @property {React.ComponentType} IconComponent - Icon component to display
 * @property {TemplateOption|null} template - Template option data
 * @property {Theme} theme - Theme data
 * @property {Object} audio_option - Audio option data
 */

/**
 * @typedef {Object} BrandingCardGridProps
 * @property {Object} commonProps - Common props for branding cards
 */

/**
 * @typedef {Object} SelectTemplateMembersProps
 * @property {boolean} hasMediaItems - Whether user has media items
 */

/**
 * @typedef {Object} TemplateDetailPageProps
 * @property {Template} template - Template data
 */

/**
 * @typedef {Object} PrefabPlayerGridProps
 * @property {UserAccount} account - User account data
 */

/**
 * @typedef {Object} UpdateUserAccountParams
 * @property {UserAccount} userAccount - User account to update
 * @property {Template} template - Template to apply
 */

/**
 * @typedef {Object} FilterTemplateParams
 * @property {Array<Template>} templatesData - Array of templates to filter
 * @property {UserAccount} userAccount - User account for filtering
 */

/**
 * @typedef {Object} CreatePreviewObjectParams
 * @property {UserAccount} userAccount - User account to create preview object from
 */

/**
 * @typedef {Object} FilterAudioOptionsParams
 * @property {PreviewObject} previewObj - Preview object containing template options
 * @property {Asset} ASSET - Asset object with composition ID
 */

/**
 * @typedef {Object} CreateVideoParams
 * @property {PreviewObject} previewObj - Preview object containing account and template data
 * @property {Asset} ASSET - Asset object with video metadata
 */

/**
 * @typedef {Object} CreateThemeParams
 * @property {PreviewObject} previewObj - Preview object containing template and theme data
 */

/**
 * @typedef {Object} CreateClubParams
 * @property {PreviewObject} accountCustomDataOBJ - Preview object containing account and sponsor data
 */

/**
 * @typedef {Object} PrepareMockDataParams
 * @property {UserAccount} account - User account object
 */

// Export types for use in other files
export {};
