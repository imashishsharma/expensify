package com.ashish.expensify.service.impl;

import com.ashish.expensify.service.TransactionFunnelService;
import com.ashish.expensify.domain.TransactionFunnel;
import com.ashish.expensify.repository.TransactionFunnelRepository;
import com.ashish.expensify.service.dto.TransactionFunnelDTO;
import com.ashish.expensify.service.mapper.TransactionFunnelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing TransactionFunnel.
 */
@Service
@Transactional
public class TransactionFunnelServiceImpl implements TransactionFunnelService {

    private final Logger log = LoggerFactory.getLogger(TransactionFunnelServiceImpl.class);

    private final TransactionFunnelRepository transactionFunnelRepository;

    private final TransactionFunnelMapper transactionFunnelMapper;

    public TransactionFunnelServiceImpl(TransactionFunnelRepository transactionFunnelRepository, TransactionFunnelMapper transactionFunnelMapper) {
        this.transactionFunnelRepository = transactionFunnelRepository;
        this.transactionFunnelMapper = transactionFunnelMapper;
    }

    /**
     * Save a transactionFunnel.
     *
     * @param transactionFunnelDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TransactionFunnelDTO save(TransactionFunnelDTO transactionFunnelDTO) {
        log.debug("Request to save TransactionFunnel : {}", transactionFunnelDTO);
        TransactionFunnel transactionFunnel = transactionFunnelMapper.toEntity(transactionFunnelDTO);
        transactionFunnel = transactionFunnelRepository.save(transactionFunnel);
        return transactionFunnelMapper.toDto(transactionFunnel);
    }

    /**
     * Get all the transactionFunnels.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransactionFunnelDTO> findAll() {
        log.debug("Request to get all TransactionFunnels");
        return transactionFunnelRepository.findAll().stream()
            .map(transactionFunnelMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one transactionFunnel by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TransactionFunnelDTO findOne(Long id) {
        log.debug("Request to get TransactionFunnel : {}", id);
        TransactionFunnel transactionFunnel = transactionFunnelRepository.findOne(id);
        return transactionFunnelMapper.toDto(transactionFunnel);
    }

    /**
     * Delete the transactionFunnel by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransactionFunnel : {}", id);
        transactionFunnelRepository.delete(id);
    }
}
