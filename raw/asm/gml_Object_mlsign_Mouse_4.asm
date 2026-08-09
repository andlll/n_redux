// gml_Object_mlsign_Mouse_4  locals=2 args=0 len=188
// locals: arguments, __b__
00000000: push.imm.e 156
00000004: pushenv 0x210E2AC
00000008: push.imm.e 0
0000000C: pop.v.i selec
00000014: popenv 0x410E2A0
00000018: push.imm.e 0
0000001C: conv.i.v
00000020: push.imm.e 0
00000024: conv.i.v
00000028: push.v full
00000030: call action_if_variable(argc=3)
00000038: pop.v.v local.__b__
00000040: push.local.v local.__b__
00000048: conv.v.b
0000004C: bf 0x210E354
00000050: push.imm.e 156
00000054: pushenv 0x210E32C
00000058: push.imm.e 4
0000005C: conv.i.v
00000060: push.imm.e 200
00000064: conv.i.v
00000068: push.v mon
00000070: call action_if_variable(argc=3)
00000078: pop.v.v local.__b__
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x210E32C
00000090: b 0x210E334
00000094: popenv 0x410E2F0
00000098: b 0x210E338
0000009C: popenv 0x1D0E334
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x210E354
000000B0: push.imm.e 1
000000B4: pop.v.i arm