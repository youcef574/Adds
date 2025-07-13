// ===== GLOBAL VARIABLES =====
let currentLanguage = localStorage.getItem('language') || 'fr';
let quillShort, quillDetailed;
let mainImageDropzone, galleryDropzone;
let formData = {
    mainImage: null,
    galleryImages: [],
    variants: {}
};
let validationRules = {};
let progressPercentage = 0;
let autoSaveInterval;
let variantCounter = 0;

// ===== LANGUAGE SYSTEM =====
const translations = {
    fr: {
        // Header & Navigation
        'dashboard': 'Tableau de bord',
        'settings': 'Paramètres',
        'logout': 'Déconnexion',
        
        // Page Title
        'add_new_product': 'Ajouter un nouveau produit',
        'fill_product_info': 'Complétez les informations ci-dessous pour ajouter votre produit',
        'form_progress': 'Progression du formulaire',
        'progress': 'Progression',
        
        // Form Sections
        'basic_information': 'Informations de base',
        'essential_product_details': 'Détails essentiels du produit',
        'product_description': 'Description du produit',
        'describe_product_detail': 'Décrivez votre produit en détail',
        'product_images': 'Images du produit',
        'add_attractive_images': 'Ajoutez des images attrayantes',
        'product_variants': 'Variantes du produit',
        'add_options_color_size': 'Ajoutez des options comme la couleur, la taille, etc.',
        'additional_options': 'Options supplémentaires',
        'advanced_product_settings': 'Paramètres avancés du produit',
        
        // Form Fields
        'product_name': 'Nom du produit',
        'price_dzd': 'Prix (DZD)',
        'quantity_optional': 'Quantité (optionnel)',
        'short_description': 'Description courte',
        'detailed_description': 'Description détaillée',
        'main_image': 'Image principale',
        'image_gallery': 'Galerie d\'images',
        'variant_name': 'Nom de la variante',
        'variant_value': 'Valeur de la variante',
        'store_visibility': 'Visibilité dans la boutique',
        'visible': 'Visible',
        'hidden': 'Masqué',
        
        // Buttons
        'save_product': 'Enregistrer le produit',
        'reset': 'Réinitialiser',
        'preview': 'Aperçu',
        'save_as_draft': 'Sauvegarder comme brouillon',
        'add_variant': 'Ajouter une variante',
        'add_value': 'Ajouter',
        'remove': 'Supprimer',
        'ok': 'OK',
        'cancel': 'Annuler',
        
        // Dropzone
        'drop_main_image_here': 'Glissez votre image principale ici',
        'or_click_to_select': 'ou cliquez pour sélectionner',
        'png_jpg_webp_5mb': 'PNG, JPG, WEBP jusqu\'à 5MB',
        'add_additional_images': 'Ajoutez des images supplémentaires',
        'up_to_5_images': 'Jusqu\'à 5 images',
        'png_jpg_webp_5mb_each': 'PNG, JPG, WEBP jusqu\'à 5MB chacune',
        
        // Variants
        'variant': 'Variante',
        'enter_variant_name': 'Entrez le nom de la variante (ex: Couleur, Taille)',
        'enter_variant_value': 'Entrez une valeur et appuyez sur Entrée',
        
        // Validation Messages
        'field_required': 'Ce champ est obligatoire',
        'min_length': 'Minimum {min} caractères requis',
        'max_length': 'Maximum {max} caractères autorisés',
        'invalid_price': 'Veuillez entrer un prix valide',
        'invalid_quantity': 'Veuillez entrer une quantité valide',
        'invalid_file_format': 'Format de fichier non supporté',
        'file_too_large': 'Fichier trop volumineux (max {size}MB)',
        'max_images_reached': 'Maximum {max} images autorisées',
        'duplicate_value': 'Cette valeur existe déjà',
        'max_values_reached': 'Maximum {max} valeurs autorisées',
        'variant_name_required': 'Le nom de la variante est requis',
        'variant_values_required': 'Au moins une valeur est requise',
        
        // Success Messages
        'product_saved': 'Produit enregistré avec succès',
        'draft_saved': 'Brouillon sauvegardé',
        'form_reset': 'Formulaire réinitialisé',
        'variant_added': 'Variante ajoutée',
        'variant_removed': 'Variante supprimée',
        'value_added': 'Valeur ajoutée',
        'value_removed': 'Valeur supprimée',
        'auto_save_restored': 'Données auto-sauvegardées restaurées',
        
        // Error Messages
        'save_error': 'Erreur lors de la sauvegarde',
        'network_error': 'Erreur de connexion',
        'validation_error': 'Veuillez corriger les erreurs dans le formulaire',
        'load_error': 'Erreur lors du chargement',
        
        // Modal
        'success': 'Succès',
        'error': 'Erreur',
        'warning': 'Attention',
        'confirm': 'Confirmation',
        'info': 'Information',
        
        // Loading
        'saving': 'Enregistrement en cours...',
        'loading': 'Chargement...',
        'processing': 'Traitement en cours...',
        
        // Other
        'confirm_action': 'Êtes-vous sûr de vouloir effectuer cette action ?',
        'unsaved_changes': 'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?'
    },
    en: {
        // Header & Navigation
        'dashboard': 'Dashboard',
        'settings': 'Settings',
        'logout': 'Logout',
        
        // Page Title
        'add_new_product': 'Add New Product',
        'fill_product_info': 'Fill in the information below to add your product',
        'form_progress': 'Form Progress',
        'progress': 'Progress',
        
        // Form Sections
        'basic_information': 'Basic Information',
        'essential_product_details': 'Essential product details',
        'product_description': 'Product Description',
        'describe_product_detail': 'Describe your product in detail',
        'product_images': 'Product Images',
        'add_attractive_images': 'Add attractive images',
        'product_variants': 'Product Variants',
        'add_options_color_size': 'Add options like color, size, etc.',
        'additional_options': 'Additional Options',
        'advanced_product_settings': 'Advanced product settings',
        
        // Form Fields
        'product_name': 'Product Name',
        'price_dzd': 'Price (DZD)',
        'quantity_optional': 'Quantity (optional)',
        'short_description': 'Short Description',
        'detailed_description': 'Detailed Description',
        'main_image': 'Main Image',
        'image_gallery': 'Image Gallery',
        'variant_name': 'Variant Name',
        'variant_value': 'Variant Value',
        'store_visibility': 'Store Visibility',
        'visible': 'Visible',
        'hidden': 'Hidden',
        
        // Buttons
        'save_product': 'Save Product',
        'reset': 'Reset',
        'preview': 'Preview',
        'save_as_draft': 'Save as Draft',
        'add_variant': 'Add Variant',
        'add_value': 'Add',
        'remove': 'Remove',
        'ok': 'OK',
        'cancel': 'Cancel',
        
        // Dropzone
        'drop_main_image_here': 'Drop your main image here',
        'or_click_to_select': 'or click to select',
        'png_jpg_webp_5mb': 'PNG, JPG, WEBP up to 5MB',
        'add_additional_images': 'Add additional images',
        'up_to_5_images': 'Up to 5 images',
        'png_jpg_webp_5mb_each': 'PNG, JPG, WEBP up to 5MB each',
        
        // Variants
        'variant': 'Variant',
        'enter_variant_name': 'Enter variant name (e.g. Color, Size)',
        'enter_variant_value': 'Enter a value and press Enter',
        
        // Validation Messages
        'field_required': 'This field is required',
        'min_length': 'Minimum {min} characters required',
        'max_length': 'Maximum {max} characters allowed',
        'invalid_price': 'Please enter a valid price',
        'invalid_quantity': 'Please enter a valid quantity',
        'invalid_file_format': 'Unsupported file format',
        'file_too_large': 'File too large (max {size}MB)',
        'max_images_reached': 'Maximum {max} images allowed',
        'duplicate_value': 'This value already exists',
        'max_values_reached': 'Maximum {max} values allowed',
        'variant_name_required': 'Variant name is required',
        'variant_values_required': 'At least one value is required',
        
        // Success Messages
        'product_saved': 'Product saved successfully',
        'draft_saved': 'Draft saved',
        'form_reset': 'Form reset',
        'variant_added': 'Variant added',
        'variant_removed': 'Variant removed',
        'value_added': 'Value added',
        'value_removed': 'Value removed',
        'auto_save_restored': 'Auto-saved data restored',
        
        // Error Messages
        'save_error': 'Error saving product',
        'network_error': 'Network error',
        'validation_error': 'Please fix errors in the form',
        'load_error': 'Error loading data',
        
        // Modal
        'success': 'Success',
        'error': 'Error',
        'warning': 'Warning',
        'confirm': 'Confirmation',
        'info': 'Information',
        
        // Loading
        'saving': 'Saving...',
        'loading': 'Loading...',
        'processing': 'Processing...',
        
        // Other
        'confirm_action': 'Are you sure you want to perform this action?',
        'unsaved_changes': 'You have unsaved changes. Do you really want to leave?'
    }
};

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function generateId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ===== LANGUAGE FUNCTIONS =====
function translate(key, params = {}) {
    let text = translations[currentLanguage][key] || key;
    
    // Replace parameters in text
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
}

function updateLanguage() {
    // Update all elements with data-fr and data-en attributes
    document.querySelectorAll('[data-fr][data-en]').forEach(element => {
        const text = currentLanguage === 'fr' ? element.getAttribute('data-fr') : element.getAttribute('data-en');
        if (element.tagName === 'INPUT' && element.type !== 'radio' && element.type !== 'checkbox') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update language toggle button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.querySelector('span').textContent = currentLanguage.toUpperCase();
    }
    
    // Update progress text
    updateProgressText();
    
    // Update Quill editor placeholders
    updateQuillPlaceholders();
    
    // Update dropzone texts
    updateDropzoneTexts();
    
    // Save language preference
    localStorage.setItem('language', currentLanguage);
}

function updateQuillPlaceholders() {
    if (quillShort) {
        quillShort.root.dataset.placeholder = translate('short_description');
    }
    if (quillDetailed) {
        quillDetailed.root.dataset.placeholder = translate('detailed_description');
    }
}

function updateDropzoneTexts() {
    // Update dropzone content will be handled in initDropzones
    const mainDropzone = document.querySelector('#mainImageDropzone .dropzone-content h4');
    const galleryDropzone = document.querySelector('#imageGalleryDropzone .dropzone-content h4');
    
    if (mainDropzone) {
        mainDropzone.textContent = translate('drop_main_image_here');
    }
    if (galleryDropzone) {
        galleryDropzone.textContent = translate('add_additional_images');
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    updateLanguage();
}

// ===== VALIDATION SYSTEM =====
function initValidationRules() {
    validationRules = {
        productName: {
            required: true,
            minLength: 3,
            maxLength: 100
        },
        productPrice: {
            required: true,
            type: 'number',
            min: 0
        },
        productQuantity: {
            type: 'number',
            min: 0
        },
        shortDescription: {
            required: true,
            minLength: 10,
            maxLength: 200
        },
        detailedDescription: {
            required: true,
            minLength: 30,
            maxLength: 2000
        },
        mainImage: {
            required: true,
            type: 'file',
            formats: ['jpg', 'jpeg', 'png', 'webp'],
            maxSize: 5 // MB
        }
    };
}

function validateField(fieldName, value, showError = true) {
    const rules = validationRules[fieldName];
    if (!rules) return true;
    
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    // Clear previous validation state
    if (field) {
        field.classList.remove('valid', 'invalid');
    }
    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }
    
    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
        if (showError) {
            showFieldError(fieldName, translate('field_required'));
        }
        return false;
    }
    
    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') {
        if (field) field.classList.add('valid');
        return true;
    }
    
    // Type validation
    if (rules.type === 'number') {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            if (showError) {
                showFieldError(fieldName, fieldName.includes('price') ? translate('invalid_price') : translate('invalid_quantity'));
            }
            return false;
        }
        
        // Min value validation
        if (rules.min !== undefined && numValue < rules.min) {
            if (showError) {
                showFieldError(fieldName, fieldName.includes('price') ? translate('invalid_price') : translate('invalid_quantity'));
            }
            return false;
        }
    }
    
    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
        if (showError) {
            showFieldError(fieldName, translate('min_length', { min: rules.minLength }));
        }
        return false;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
        if (showError) {
            showFieldError(fieldName, translate('max_length', { max: rules.maxLength }));
        }
        return false;
    }
    
    // File validation
    if (rules.type === 'file' && value instanceof File) {
        // Format validation
        const extension = value.name.split('.').pop().toLowerCase();
        if (rules.formats && !rules.formats.includes(extension)) {
            if (showError) {
                showFieldError(fieldName, translate('invalid_file_format'));
            }
            return false;
        }
        
        // Size validation
        if (rules.maxSize && value.size > rules.maxSize * 1024 * 1024) {
            if (showError) {
                showFieldError(fieldName, translate('file_too_large', { size: rules.maxSize }));
            }
            return false;
        }
    }
    
    // Field is valid
    if (field) {
        field.classList.add('valid');
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (field) {
        field.classList.add('invalid');
        field.classList.remove('valid');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function validateForm() {
    let isValid = true;
    
    // Validate basic fields
    Object.keys(validationRules).forEach(fieldName => {
        let value;
        
        if (fieldName === 'shortDescription') {
            value = quillShort ? quillShort.getText().trim() : '';
        } else if (fieldName === 'detailedDescription') {
            value = quillDetailed ? quillDetailed.getText().trim() : '';
        } else if (fieldName === 'mainImage') {
            value = formData.mainImage || null;
        } else {
            const field = document.getElementById(fieldName);
            value = field ? field.value : '';
        }
        
        if (!validateField(fieldName, value, true)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// ===== PROGRESS BAR =====
function calculateProgress() {
    const fields = [
        { id: 'productName', weight: 15 },
        { id: 'productPrice', weight: 15 },
        { id: 'productQuantity', weight: 5 },
        { id: 'shortDescription', weight: 15, isQuill: true, editor: quillShort },
        { id: 'detailedDescription', weight: 20, isQuill: true, editor: quillDetailed },
        { id: 'mainImage', weight: 20, isFile: true },
        { id: 'imageGallery', weight: 10, isGallery: true }
    ];
    
    let totalProgress = 0;
    
    fields.forEach(field => {
        let value = '';
        let isCompleted = false;
        
        if (field.isQuill && field.editor) {
            value = field.editor.getText().trim();
            isCompleted = value.length > 0;
        } else if (field.isFile) {
            isCompleted = formData.mainImage !== null && formData.mainImage !== undefined;
        } else if (field.isGallery) {
            isCompleted = formData.galleryImages && formData.galleryImages.length > 0;
        } else {
            const element = document.getElementById(field.id);
            if (element) {
                value = element.value.trim();
                isCompleted = value.length > 0;
            }
        }
        
        if (isCompleted) {
            totalProgress += field.weight;
        }
    });
    
    progressPercentage = Math.min(totalProgress, 100);
    updateProgressBar();
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressPercentageEl = document.getElementById('progressPercentage');
    
    if (progressFill) {
        progressFill.style.width = progressPercentage + '%';
    }
    
    if (progressPercentageEl) {
        progressPercentageEl.textContent = Math.round(progressPercentage) + '%';
    }
    
    updateProgressText();
}

function updateProgressText() {
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = translate('progress') + ': ' + Math.round(progressPercentage) + '%';
    }
}

// ===== QUILL EDITOR SETUP =====
function initQuillEditors() {
    // Short description editor
    quillShort = new Quill('#shortDescription', {
        theme: 'snow',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                ['link'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean']
            ]
        },
        placeholder: translate('short_description')
    });
    
    // Detailed description editor
    quillDetailed = new Quill('#detailedDescription', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['blockquote', 'code-block'],
                ['clean']
            ]
        },
        placeholder: translate('detailed_description')
    });
    
    // Add event listeners for validation and progress
    quillShort.on('text-change', debounce(() => {
        const content = quillShort.getText().trim();
        validateField('shortDescription', content);
        calculateProgress();
        autoSaveForm();
    }, 300));
    
    quillDetailed.on('text-change', debounce(() => {
        const content = quillDetailed.getText().trim();
        validateField('detailedDescription', content);
        calculateProgress();
        autoSaveForm();
    }, 300));
}

// ===== DROPZONE SETUP =====
function initDropzones() {
    // Disable Dropzone auto-discovery
    Dropzone.autoDiscover = false;
    
    // Main image dropzone
    mainImageDropzone = new Dropzone('#mainImageDropzone', {
        url: '/upload', // This will be handled by our custom logic
        maxFiles: 1,
        acceptedFiles: 'image/jpeg,image/jpg,image/png,image/webp',
        maxFilesize: 5, // MB
        addRemoveLinks: true,
        autoProcessQueue: false,
        dictDefaultMessage: '',
        dictRemoveFile: '×',
        dictFileTooBig: translate('file_too_large', { size: '{{maxFilesize}}' }),
        dictInvalidFileType: translate('invalid_file_format')
    });
    
    // Gallery dropzone
    galleryDropzone = new Dropzone('#imageGalleryDropzone', {
        url: '/upload',
        maxFiles: 5,
        acceptedFiles: 'image/jpeg,image/jpg,image/png,image/webp',
        maxFilesize: 5,
        addRemoveLinks: true,
        autoProcessQueue: false,
        dictDefaultMessage: '',
        dictRemoveFile: '×',
        dictFileTooBig: translate('file_too_large', { size: '{{maxFilesize}}' }),
        dictInvalidFileType: translate('invalid_file_format'),
        dictMaxFilesExceeded: translate('max_images_reached', { max: '{{maxFiles}}' })
    });
    
    // Main image events
    mainImageDropzone.on('addedfile', function(file) {
        formData.mainImage = file;
        validateField('mainImage', file);
        calculateProgress();
        autoSaveForm();
    });
    
    mainImageDropzone.on('removedfile', function(file) {
        formData.mainImage = null;
        validateField('mainImage', null);
        calculateProgress();
        autoSaveForm();
    });
    
    // Gallery events
    galleryDropzone.on('addedfile', function(file) {
        if (!formData.galleryImages) {
            formData.galleryImages = [];
        }
        formData.galleryImages.push(file);
        calculateProgress();
        autoSaveForm();
    });
    
    galleryDropzone.on('removedfile', function(file) {
        if (formData.galleryImages) {
            const index = formData.galleryImages.indexOf(file);
            if (index > -1) {
                formData.galleryImages.splice(index, 1);
            }
        }
        calculateProgress();
        autoSaveForm();
    });
    
    // Error handling
    mainImageDropzone.on('error', function(file, message) {
        showToast('error', translate('error'), message);
    });
    
    galleryDropzone.on('error', function(file, message) {
        showToast('error', translate('error'), message);
    });
}

// ===== VARIANT MANAGEMENT =====
function initVariantSystem() {
    const addVariantBtn = document.getElementById('addVariantBtn');
    if (addVariantBtn) {
        addVariantBtn.addEventListener('click', addVariant);
    }
}

function addVariant() {
    variantCounter++;
    const variantId = 'variant_' + generateId();
    
    formData.variants[variantId] = {
        name: '',
        values: []
    };
    
    const variantHTML = `
        <div class="variant-item" data-variant-id="${variantId}">
            <div class="variant-header">
                <h4 class="variant-title">${translate('variant')} ${variantCounter}</h4>
                <button type="button" class="variant-remove" onclick="removeVariant('${variantId}')">
                    <i class="fas fa-trash"></i>
                    <span>${translate('remove')}</span>
                </button>
            </div>
            <div class="variant-content">
                <div class="form-field variant-name-input">
                    <label for="${variantId}_name">${translate('variant_name')}</label>
                    <div class="input-container">
                        <input type="text" 
                               id="${variantId}_name" 
                               placeholder="${translate('enter_variant_name')}"
                               onchange="updateVariantName('${variantId}', this.value)">
                        <div class="input-icon">
                            <i class="fas fa-tag"></i>
                        </div>
                    </div>
                </div>
                <div class="form-field variant-values">
                    <label>${translate('variant_value')}</label>
                    <div class="values-input-container">
                        <input type="text" 
                               id="${variantId}_value_input" 
                               placeholder="${translate('enter_variant_value')}"
                               onkeypress="handleVariantValueKeyPress(event, '${variantId}')">
                        <button type="button" class="add-value-btn" onclick="addVariantValue('${variantId}')">
                            <i class="fas fa-plus"></i>
                            <span>${translate('add_value')}</span>
                        </button>
                    </div>
                    <div class="tags-display" id="${variantId}_tags"></div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('variantsContainer').insertAdjacentHTML('beforeend', variantHTML);
    updateVariantStatus(variantId);
    showToast('success', translate('success'), translate('variant_added'));
}

function removeVariant(variantId) {
    if (confirm(translate('confirm_action'))) {
        const variantElement = document.querySelector(`[data-variant-id="${variantId}"]`);
        if (variantElement) {
            variantElement.remove();
        }
        
        delete formData.variants[variantId];
        autoSaveForm();
        showToast('success', translate('success'), translate('variant_removed'));
    }
}

function updateVariantName(variantId, name) {
    if (formData.variants[variantId]) {
        formData.variants[variantId].name = name.trim();
        updateVariantStatus(variantId);
        autoSaveForm();
    }
}

function handleVariantValueKeyPress(event, variantId) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addVariantValue(variantId);
    }
}

function addVariantValue(variantId) {
    const input = document.getElementById(`${variantId}_value_input`);
    if (!input) return;
    
    const value = input.value.trim();
    if (!value) {
        showToast('warning', translate('warning'), translate('field_required'));
        return;
    }
    
    if (!formData.variants[variantId]) {
        formData.variants[variantId] = { name: '', values: [] };
    }
    
    // Check for duplicates
    if (formData.variants[variantId].values.includes(value)) {
        showToast('warning', translate('warning'), translate('duplicate_value'));
        return;
    }
    
    // Check max values limit
    if (formData.variants[variantId].values.length >= 20) {
        showToast('warning', translate('warning'), translate('max_values_reached', { max: 20 }));
        return;
    }
    
    formData.variants[variantId].values.push(value);
    input.value = '';
    
    renderVariantTags(variantId);
    updateVariantStatus(variantId);
    autoSaveForm();
    showToast('success', translate('success'), translate('value_added'));
}

function removeVariantValue(variantId, value) {
    if (formData.variants[variantId]) {
        const index = formData.variants[variantId].values.indexOf(value);
        if (index > -1) {
            formData.variants[variantId].values.splice(index, 1);
            renderVariantTags(variantId);
            updateVariantStatus(variantId);
            autoSaveForm();
            showToast('success', translate('success'), translate('value_removed'));
        }
    }
}

function renderVariantTags(variantId) {
    const tagsContainer = document.getElementById(`${variantId}_tags`);
    if (!tagsContainer || !formData.variants[variantId]) return;
    
    tagsContainer.innerHTML = '';
    
    if (formData.variants[variantId].values.length > 0) {
        tagsContainer.classList.add('has-tags');
    } else {
        tagsContainer.classList.remove('has-tags');
    }
    
    formData.variants[variantId].values.forEach(value => {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `
            <span>${value}</span>
            <button type="button" class="tag-remove" onclick="removeVariantValue('${variantId}', '${value}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        tagsContainer.appendChild(tag);
    });
}

function updateVariantStatus(variantId) {
    const variantElement = document.querySelector(`[data-variant-id="${variantId}"]`);
    if (!variantElement || !formData.variants[variantId]) return;
    
    const hasName = formData.variants[variantId].name.length > 0;
    const hasValues = formData.variants[variantId].values.length > 0;
    
    if (hasName || hasValues) {
        variantElement.classList.add('active');
    } else {
        variantElement.classList.remove('active');
    }
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const form = document.getElementById('productForm');
    const resetBtn = document.getElementById('resetBtn');
    const previewBtn = document.getElementById('previewBtn');
    const draftBtn = document.getElementById('draftBtn');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', handleFormReset);
    }
    
    if (previewBtn) {
        previewBtn.addEventListener('click', handlePreview);
    }
    
    if (draftBtn) {
        draftBtn.addEventListener('click', handleSaveDraft);
    }
    
    // Add input event listeners for real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        if (input.type !== 'file' && input.type !== 'radio' && input.type !== 'checkbox') {
            input.addEventListener('input', debounce((e) => {
                validateField(e.target.id || e.target.name, e.target.value);
                calculateProgress();
                autoSaveForm();
            }, 300));
            
            input.addEventListener('blur', (e) => {
                validateField(e.target.id || e.target.name, e.target.value, true);
            });
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showToast('error', translate('error'), translate('validation_error'));
        return;
    }
    
    showLoadingOverlay(true);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);
    
    // Simulate form submission
    setTimeout(() => {
        setButtonLoading(submitBtn, false);
        showLoadingOverlay(false);
        showModal('success', translate('success'), translate('product_saved'));
        clearAutoSave();
        
        // Redirect after 3 seconds
        setTimeout(() => {
            console.log('Redirecting to dashboard...');
        }, 3000);
    }, 2000);
}

function handleFormReset() {
    if (confirm(translate('confirm_action'))) {
        // Reset form
        document.getElementById('productForm').reset();
        
        // Reset Quill editors
        if (quillShort) quillShort.setText('');
        if (quillDetailed) quillDetailed.setText('');
        
        // Reset dropzones
        if (mainImageDropzone) mainImageDropzone.removeAllFiles();
        if (galleryDropzone) galleryDropzone.removeAllFiles();
        
        // Reset variants
        document.getElementById('variantsContainer').innerHTML = '';
        variantCounter = 0;
        
        // Reset form data
        formData = {
            mainImage: null,
            galleryImages: [],
            variants: {}
        };
        
        // Reset validation states
        document.querySelectorAll('.valid, .invalid').forEach(el => {
            el.classList.remove('valid', 'invalid');
        });
        
        document.querySelectorAll('.error-message.show').forEach(el => {
            el.classList.remove('show');
        });
        
        // Reset progress
        progressPercentage = 0;
        updateProgressBar();
        
        // Clear auto-save
        clearAutoSave();
        
        showToast('success', translate('success'), translate('form_reset'));
    }
}

function handlePreview() {
    const previewData = collectFormData();
    console.log('Preview data:', previewData);
    showToast('info', translate('info'), 'Preview functionality would open here');
}

function handleSaveDraft() {
    const draftBtn = document.getElementById('draftBtn');
    setButtonLoading(draftBtn, true);
    
    const draftData = collectFormData();
    localStorage.setItem('productDraft', JSON.stringify(draftData));
    
    setTimeout(() => {
        setButtonLoading(draftBtn, false);
        showToast('success', translate('success'), translate('draft_saved'));
    }, 1000);
}

function collectFormData() {
    const data = {
        productName: document.getElementById('productName')?.value || '',
        productPrice: document.getElementById('productPrice')?.value || '',
        productQuantity: document.getElementById('productQuantity')?.value || '',
        shortDescription: quillShort ? quillShort.getContents() : null,
        detailedDescription: quillDetailed ? quillDetailed.getContents() : null,
        storeVisibility: document.querySelector('input[name="storeVisibility"]:checked')?.value || 'yes',
        variants: formData.variants,
        timestamp: new Date().toISOString()
    };
    
    return data;
}

function setButtonLoading(button, loading) {
    if (!button) return;
    
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// ===== AUTO-SAVE FUNCTIONALITY =====
function initAutoSave() {
    // Auto-save every 30 seconds
    autoSaveInterval = setInterval(autoSaveForm, 30000);
    
    // Save on page unload
    window.addEventListener('beforeunload', (e) => {
        const hasUnsavedChanges = checkForUnsavedChanges();
        if (hasUnsavedChanges) {
            autoSaveForm();
            e.preventDefault();
            e.returnValue = translate('unsaved_changes');
        }
    });
}

function autoSaveForm() {
    const autoSaveData = collectFormData();
    localStorage.setItem('productAutoSave', JSON.stringify(autoSaveData));
}

function restoreAutoSave() {
    const autoSaveData = localStorage.getItem('productAutoSave');
    if (autoSaveData) {
        try {
            const data = JSON.parse(autoSaveData);
            
            // Restore basic fields
            if (data.productName) document.getElementById('productName').value = data.productName;
            if (data.productPrice) document.getElementById('productPrice').value = data.productPrice;
            if (data.productQuantity) document.getElementById('productQuantity').value = data.productQuantity;
            
            // Restore Quill content
            if (data.shortDescription && quillShort) {
                quillShort.setContents(data.shortDescription);
            }
            if (data.detailedDescription && quillDetailed) {
                quillDetailed.setContents(data.detailedDescription);
            }
            
            // Restore radio selection
            if (data.storeVisibility) {
                const radio = document.querySelector(`input[name="storeVisibility"][value="${data.storeVisibility}"]`);
                if (radio) radio.checked = true;
            }
            
            // Restore variants
            if (data.variants) {
                Object.keys(data.variants).forEach(variantId => {
                    const variant = data.variants[variantId];
                    if (variant.name || variant.values.length > 0) {
                        formData.variants[variantId] = variant;
                        // Create variant UI
                        variantCounter++;
                        const variantHTML = createVariantHTML(variantId, variantCounter);
                        document.getElementById('variantsContainer').insertAdjacentHTML('beforeend', variantHTML);
                        
                        // Restore variant data
                        if (variant.name) {
                            const nameInput = document.getElementById(`${variantId}_name`);
                            if (nameInput) nameInput.value = variant.name;
                        }
                        
                        if (variant.values.length > 0) {
                            renderVariantTags(variantId);
                        }
                        
                        updateVariantStatus(variantId);
                    }
                });
            }
            
            // Recalculate progress
            calculateProgress();
            
            showToast('info', translate('info'), translate('auto_save_restored'));
        } catch (error) {
            console.error('Error restoring auto-save:', error);
        }
    }
}

function createVariantHTML(variantId, counter) {
    return `
        <div class="variant-item" data-variant-id="${variantId}">
            <div class="variant-header">
                <h4 class="variant-title">${translate('variant')} ${counter}</h4>
                <button type="button" class="variant-remove" onclick="removeVariant('${variantId}')">
                    <i class="fas fa-trash"></i>
                    <span>${translate('remove')}</span>
                </button>
            </div>
            <div class="variant-content">
                <div class="form-field variant-name-input">
                    <label for="${variantId}_name">${translate('variant_name')}</label>
                    <div class="input-container">
                        <input type="text" 
                               id="${variantId}_name" 
                               placeholder="${translate('enter_variant_name')}"
                               onchange="updateVariantName('${variantId}', this.value)">
                        <div class="input-icon">
                            <i class="fas fa-tag"></i>
                        </div>
                    </div>
                </div>
                <div class="form-field variant-values">
                    <label>${translate('variant_value')}</label>
                    <div class="values-input-container">
                        <input type="text" 
                               id="${variantId}_value_input" 
                               placeholder="${translate('enter_variant_value')}"
                               onkeypress="handleVariantValueKeyPress(event, '${variantId}')">
                        <button type="button" class="add-value-btn" onclick="addVariantValue('${variantId}')">
                            <i class="fas fa-plus"></i>
                            <span>${translate('add_value')}</span>
                        </button>
                    </div>
                    <div class="tags-display" id="${variantId}_tags"></div>
                </div>
            </div>
        </div>
    `;
}

function clearAutoSave() {
    localStorage.removeItem('productAutoSave');
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
    }
}

function checkForUnsavedChanges() {
    const currentData = collectFormData();
    return Object.values(currentData).some(value => 
        value && value !== '' && value !== 'yes'
    );
}

// ===== UI UTILITIES =====
function showLoadingOverlay(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        if (show) {
            overlay.classList.add('show');
        } else {
            overlay.classList.remove('show');
        }
    }
}

function initDropdownMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
        
        // Close dropdown when clicking on links
        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                dropdownMenu.classList.remove('active');
            });
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showToast(type, title, message, duration = 5000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-times-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    // Auto-remove after duration
    setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
    if (toast && toast.parentNode) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// ===== MODAL SYSTEM =====
function showModal(type, title, message) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalClose = document.getElementById('modalClose');
    
    if (!modalOverlay) return;
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    modalOverlay.classList.add('show');
    
    // Close handlers
    const closeModal = () => {
        modalOverlay.classList.remove('show');
    };
    
    modalConfirm.onclick = closeModal;
    modalClose.onclick = closeModal;
    
    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    };
    
    // ESC key handler
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    
    document.addEventListener('keydown', escHandler);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems
    initValidationRules();
    initFormHandling();
    initQuillEditors();
    initDropzones();
    initVariantSystem();
    initAutoSave();
    initDropdownMenu();
    
    // Set up language system
    updateLanguage();
    
    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Restore auto-saved data
    setTimeout(restoreAutoSave, 1000);
    
    // Initial progress calculation
    calculateProgress();
    
    console.log('YouZinElegancia Product Form initialized successfully!');
});

// ===== GLOBAL FUNCTIONS (for HTML onclick handlers) =====
window.removeVariant = removeVariant;
window.updateVariantName = updateVariantName;
window.handleVariantValueKeyPress = handleVariantValueKeyPress;
window.addVariantValue = addVariantValue;
window.removeVariantValue = removeVariantValue;