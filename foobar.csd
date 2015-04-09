;Written by Iain McCurdy, 2006

;Modified for QuteCsound by René, April 2011
;Tested on Ubuntu 10.04 with csound-float 5.13.0 and QuteCsound svn rev 817


;Notes on modifications from original csd:
;	Add Browser for audio file


;my flags on Ubuntu: -iadc -odac -b1024 -B2048 -+rtaudio=alsa -+rtmidi=null -m0
<CsoundSynthesizer>
<CsOptions>

</CsOptions>
<CsInstruments>
sr 		= 44100	;SAMPLE RATE
ksmps 	= 10		;NUMBER OF AUDIO SAMPLES IN EACH CONTROL CYCLE
nchnls 	= 2		;NUMBER OF CHANNELS (2=STEREO)
0dbfs	= 1		;MAXIMUM AMPLITUDE REGARDLESS OF BIT DEPTH

instr	1
	a1 = oscil(0.25 * linsegr(0, .01, 1, p3 - .03, 1, .01, 0, .01, 0), 440, ftgenonce(0, 0, 1024, 10, 1));
	out a1
endin

</CsInstruments>
<CsScore>
i 1 0 0.5
</CsScore>
</CsoundSynthesizer>
