// gml_Object_r12_KeyPress_69  locals=2 args=0 len=312
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 2
00000020: conv.i.v
00000024: push.v noemi
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20C9DAC
0000004C: push.v noemi
00000054: push.imm.e 1
00000058: add.i.v
0000005C: pop.v.v noemi
00000064: b 0x20C9DE0
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: call action_set_relative(argc=1)
00000078: popz
0000007C: push.imm.e 0
00000080: pop.v.i noemi
00000088: push.imm.e 1
0000008C: conv.i.v
00000090: call action_set_relative(argc=1)
00000098: popz
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: push.builtin.v os_type
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x20C9E34
000000D4: push.imm.e 0
000000D8: conv.i.v
000000DC: push.imm.e 1372
000000E0: conv.i.v
000000E4: call action_set_cursor(argc=2)
000000EC: popz
000000F0: push.imm.e 0
000000F4: conv.i.v
000000F8: call action_set_relative(argc=1)
00000100: popz
00000104: push.imm.e 2
00000108: pop.v.i selec
00000110: push.imm.e 1
00000114: conv.i.v
00000118: call action_set_relative(argc=1)
00000120: popz
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: call action_set_relative(argc=1)
00000134: popz