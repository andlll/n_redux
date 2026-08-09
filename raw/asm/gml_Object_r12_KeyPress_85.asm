// gml_Object_r12_KeyPress_85  locals=2 args=0 len=204
// locals: arguments, __b__
00000000: push.imm.e 630
00000004: pushenv 0x20C9310
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v unlosei
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x20C9310
00000040: b 0x20C9318
00000044: popenv 0x40C92D4
00000048: b 0x20C931C
0000004C: popenv 0x1CC9318
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20C9398
00000060: push.imm.e 0
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.builtin.v os_type
00000078: call action_if_variable(argc=3)
00000080: pop.v.v local.__b__
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x20C9380
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: push.imm.e 1372
000000A4: conv.i.v
000000A8: call action_set_cursor(argc=2)
000000B0: popz
000000B4: push.imm.e 156
000000B8: pushenv 0x20C9394
000000BC: push.imm.e 61
000000C0: pop.v.i selec
000000C8: popenv 0x40C9388