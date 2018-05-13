package com.ashish.expensify.web.rest;

import com.ashish.expensify.ExpensifyApp;

import com.ashish.expensify.domain.TransactionFunnel;
import com.ashish.expensify.repository.TransactionFunnelRepository;
import com.ashish.expensify.service.TransactionFunnelService;
import com.ashish.expensify.service.dto.TransactionFunnelDTO;
import com.ashish.expensify.service.mapper.TransactionFunnelMapper;
import com.ashish.expensify.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ashish.expensify.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TransactionFunnelResource REST controller.
 *
 * @see TransactionFunnelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ExpensifyApp.class)
public class TransactionFunnelResourceIntTest {

    private static final Double DEFAULT_PERCENTAGE = 1D;
    private static final Double UPDATED_PERCENTAGE = 2D;

    @Autowired
    private TransactionFunnelRepository transactionFunnelRepository;

    @Autowired
    private TransactionFunnelMapper transactionFunnelMapper;

    @Autowired
    private TransactionFunnelService transactionFunnelService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransactionFunnelMockMvc;

    private TransactionFunnel transactionFunnel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransactionFunnelResource transactionFunnelResource = new TransactionFunnelResource(transactionFunnelService);
        this.restTransactionFunnelMockMvc = MockMvcBuilders.standaloneSetup(transactionFunnelResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransactionFunnel createEntity(EntityManager em) {
        TransactionFunnel transactionFunnel = new TransactionFunnel()
            .percentage(DEFAULT_PERCENTAGE);
        return transactionFunnel;
    }

    @Before
    public void initTest() {
        transactionFunnel = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransactionFunnel() throws Exception {
        int databaseSizeBeforeCreate = transactionFunnelRepository.findAll().size();

        // Create the TransactionFunnel
        TransactionFunnelDTO transactionFunnelDTO = transactionFunnelMapper.toDto(transactionFunnel);
        restTransactionFunnelMockMvc.perform(post("/api/transaction-funnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionFunnelDTO)))
            .andExpect(status().isCreated());

        // Validate the TransactionFunnel in the database
        List<TransactionFunnel> transactionFunnelList = transactionFunnelRepository.findAll();
        assertThat(transactionFunnelList).hasSize(databaseSizeBeforeCreate + 1);
        TransactionFunnel testTransactionFunnel = transactionFunnelList.get(transactionFunnelList.size() - 1);
        assertThat(testTransactionFunnel.getPercentage()).isEqualTo(DEFAULT_PERCENTAGE);
    }

    @Test
    @Transactional
    public void createTransactionFunnelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transactionFunnelRepository.findAll().size();

        // Create the TransactionFunnel with an existing ID
        transactionFunnel.setId(1L);
        TransactionFunnelDTO transactionFunnelDTO = transactionFunnelMapper.toDto(transactionFunnel);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransactionFunnelMockMvc.perform(post("/api/transaction-funnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionFunnelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TransactionFunnel in the database
        List<TransactionFunnel> transactionFunnelList = transactionFunnelRepository.findAll();
        assertThat(transactionFunnelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPercentageIsRequired() throws Exception {
        int databaseSizeBeforeTest = transactionFunnelRepository.findAll().size();
        // set the field null
        transactionFunnel.setPercentage(null);

        // Create the TransactionFunnel, which fails.
        TransactionFunnelDTO transactionFunnelDTO = transactionFunnelMapper.toDto(transactionFunnel);

        restTransactionFunnelMockMvc.perform(post("/api/transaction-funnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionFunnelDTO)))
            .andExpect(status().isBadRequest());

        List<TransactionFunnel> transactionFunnelList = transactionFunnelRepository.findAll();
        assertThat(transactionFunnelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTransactionFunnels() throws Exception {
        // Initialize the database
        transactionFunnelRepository.saveAndFlush(transactionFunnel);

        // Get all the transactionFunnelList
        restTransactionFunnelMockMvc.perform(get("/api/transaction-funnels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transactionFunnel.getId().intValue())))
            .andExpect(jsonPath("$.[*].percentage").value(hasItem(DEFAULT_PERCENTAGE.doubleValue())));
    }

    @Test
    @Transactional
    public void getTransactionFunnel() throws Exception {
        // Initialize the database
        transactionFunnelRepository.saveAndFlush(transactionFunnel);

        // Get the transactionFunnel
        restTransactionFunnelMockMvc.perform(get("/api/transaction-funnels/{id}", transactionFunnel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transactionFunnel.getId().intValue()))
            .andExpect(jsonPath("$.percentage").value(DEFAULT_PERCENTAGE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTransactionFunnel() throws Exception {
        // Get the transactionFunnel
        restTransactionFunnelMockMvc.perform(get("/api/transaction-funnels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransactionFunnel() throws Exception {
        // Initialize the database
        transactionFunnelRepository.saveAndFlush(transactionFunnel);
        int databaseSizeBeforeUpdate = transactionFunnelRepository.findAll().size();

        // Update the transactionFunnel
        TransactionFunnel updatedTransactionFunnel = transactionFunnelRepository.findOne(transactionFunnel.getId());
        // Disconnect from session so that the updates on updatedTransactionFunnel are not directly saved in db
        em.detach(updatedTransactionFunnel);
        updatedTransactionFunnel
            .percentage(UPDATED_PERCENTAGE);
        TransactionFunnelDTO transactionFunnelDTO = transactionFunnelMapper.toDto(updatedTransactionFunnel);

        restTransactionFunnelMockMvc.perform(put("/api/transaction-funnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionFunnelDTO)))
            .andExpect(status().isOk());

        // Validate the TransactionFunnel in the database
        List<TransactionFunnel> transactionFunnelList = transactionFunnelRepository.findAll();
        assertThat(transactionFunnelList).hasSize(databaseSizeBeforeUpdate);
        TransactionFunnel testTransactionFunnel = transactionFunnelList.get(transactionFunnelList.size() - 1);
        assertThat(testTransactionFunnel.getPercentage()).isEqualTo(UPDATED_PERCENTAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransactionFunnel() throws Exception {
        int databaseSizeBeforeUpdate = transactionFunnelRepository.findAll().size();

        // Create the TransactionFunnel
        TransactionFunnelDTO transactionFunnelDTO = transactionFunnelMapper.toDto(transactionFunnel);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransactionFunnelMockMvc.perform(put("/api/transaction-funnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transactionFunnelDTO)))
            .andExpect(status().isCreated());

        // Validate the TransactionFunnel in the database
        List<TransactionFunnel> transactionFunnelList = transactionFunnelRepository.findAll();
        assertThat(transactionFunnelList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTransactionFunnel() throws Exception {
        // Initialize the database
        transactionFunnelRepository.saveAndFlush(transactionFunnel);
        int databaseSizeBeforeDelete = transactionFunnelRepository.findAll().size();

        // Get the transactionFunnel
        restTransactionFunnelMockMvc.perform(delete("/api/transaction-funnels/{id}", transactionFunnel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransactionFunnel> transactionFunnelList = transactionFunnelRepository.findAll();
        assertThat(transactionFunnelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionFunnel.class);
        TransactionFunnel transactionFunnel1 = new TransactionFunnel();
        transactionFunnel1.setId(1L);
        TransactionFunnel transactionFunnel2 = new TransactionFunnel();
        transactionFunnel2.setId(transactionFunnel1.getId());
        assertThat(transactionFunnel1).isEqualTo(transactionFunnel2);
        transactionFunnel2.setId(2L);
        assertThat(transactionFunnel1).isNotEqualTo(transactionFunnel2);
        transactionFunnel1.setId(null);
        assertThat(transactionFunnel1).isNotEqualTo(transactionFunnel2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransactionFunnelDTO.class);
        TransactionFunnelDTO transactionFunnelDTO1 = new TransactionFunnelDTO();
        transactionFunnelDTO1.setId(1L);
        TransactionFunnelDTO transactionFunnelDTO2 = new TransactionFunnelDTO();
        assertThat(transactionFunnelDTO1).isNotEqualTo(transactionFunnelDTO2);
        transactionFunnelDTO2.setId(transactionFunnelDTO1.getId());
        assertThat(transactionFunnelDTO1).isEqualTo(transactionFunnelDTO2);
        transactionFunnelDTO2.setId(2L);
        assertThat(transactionFunnelDTO1).isNotEqualTo(transactionFunnelDTO2);
        transactionFunnelDTO1.setId(null);
        assertThat(transactionFunnelDTO1).isNotEqualTo(transactionFunnelDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(transactionFunnelMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(transactionFunnelMapper.fromId(null)).isNull();
    }
}
