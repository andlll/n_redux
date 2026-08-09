// gml_Object_reversi_KeyPress_27  locals=2 args=0 len=188
// locals: arguments, __b__
00000000: push.imm.e 617
00000004: pushenv 0x21EE248
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 0
00000014: conv.i.v
00000018: push.v menoo
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x21EE248
00000040: b 0x21EE250
00000044: popenv 0x41EE20C
00000048: b 0x21EE254
0000004C: popenv 0x1DEE250
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x21EE2A8
00000060: push.imm.e 0
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 717
00000074: conv.i.v
00000078: call action_create_object(argc=3)
00000080: popz
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 30
00000090: conv.i.v
00000094: call action_set_alarm(argc=2)
0000009C: popz
000000A0: b 0x21EE2C0
000000A4: push.imm.e 617
000000A8: pushenv 0x21EE2BC
000000AC: push.imm.e 0
000000B0: pop.v.i menoo
000000B8: popenv 0x41EE2B0