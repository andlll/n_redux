// gml_Object_r12_KeyPress_87  locals=2 args=0 len=204
// locals: arguments, __b__
00000000: push.imm.e 618
00000004: pushenv 0x20C9244
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v unlocinque
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x20C9244
00000040: b 0x20C924C
00000044: popenv 0x40C9208
00000048: b 0x20C9250
0000004C: popenv 0x1CC924C
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20C92CC
00000060: push.imm.e 156
00000064: pushenv 0x20C9274
00000068: push.imm.e 7
0000006C: pop.v.i selec
00000074: popenv 0x40C9268
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.builtin.v os_type
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20C92CC
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: push.imm.e 1372
000000BC: conv.i.v
000000C0: call action_set_cursor(argc=2)
000000C8: popz