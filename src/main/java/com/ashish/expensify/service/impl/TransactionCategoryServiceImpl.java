package com.ashish.expensify.service.impl;

import com.ashish.expensify.service.TransactionCategoryService;
import com.ashish.expensify.domain.TransactionCategory;
import com.ashish.expensify.repository.TransactionCategoryRepository;
import com.ashish.expensify.service.dto.TransactionCategoryDTO;
import com.ashish.expensify.service.mapper.TransactionCategoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing TransactionCategory.
 */
@Service
@Transactional
public class TransactionCategoryServiceImpl implements TransactionCategoryService {

    private final Logger log = LoggerFactory.getLogger(TransactionCategoryServiceImpl.class);

    private final TransactionCategoryRepository transactionCategoryRepository;

    private final TransactionCategoryMapper transactionCategoryMapper;

    public TransactionCategoryServiceImpl(TransactionCategoryRepository transactionCategoryRepository, TransactionCategoryMapper transactionCategoryMapper) {
        this.transactionCategoryRepository = transactionCategoryRepository;
        this.transactionCategoryMapper = transactionCategoryMapper;
    }

    /**
     * Save a transactionCategory.
     *
     * @param transactionCategoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransactionCategoryDTO save(TransactionCategoryDTO transactionCategoryDTO) {
        log.debug("Request to save TransactionCategory : {}", transactionCategoryDTO);
        TransactionCategory transactionCategory = transactionCategoryMapper.toEntity(transactionCategoryDTO);
        transactionCategory = transactionCategoryRepository.save(transactionCategory);
        return transactionCategoryMapper.toDto(transactionCategory);
    }

    /**
     * Get all the transactionCategories.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransactionCategoryDTO> findAll() {
        log.debug("Request to get all TransactionCategories");
        return transactionCategoryRepository.findAll().stream()
            .map(transactionCategoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one transactionCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TransactionCategoryDTO findOne(Long id) {
        log.debug("Request to get TransactionCategory : {}", id);
        TransactionCategory transactionCategory = transactionCategoryRepository.findOne(id);
        return transactionCategoryMapper.toDto(transactionCategory);
    }

    /**
     * Delete the transactionCategory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransactionCategory : {}", id);
        transactionCategoryRepository.delete(id);
    }
}
