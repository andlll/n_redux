// gml_Object_r12_KeyPress_79  locals=2 args=0 len=420
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.v noemi
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20C9724
0000004C: push.v noemi
00000054: push.imm.e 1
00000058: add.i.v
0000005C: pop.v.v noemi
00000064: b 0x20C9758
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
0000009C: push.imm.e 632
000000A0: pushenv 0x20C979C
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: push.imm.e 1
000000B0: conv.i.v
000000B4: push.v unlosei
000000BC: call action_if_variable(argc=3)
000000C4: pop.v.v local.__b__
000000CC: push.local.v local.__b__
000000D4: conv.v.b
000000D8: bf 0x20C979C
000000DC: b 0x20C97A4
000000E0: popenv 0x40C9760
000000E4: b 0x20C97A8
000000E8: popenv 0x1CC97A4
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x20C984C
000000FC: push.imm.e 0
00000100: conv.i.v
00000104: push.imm.e 0
00000108: conv.i.v
0000010C: push.builtin.v os_type
00000114: call action_if_variable(argc=3)
0000011C: pop.v.v local.__b__
00000124: push.local.v local.__b__
0000012C: conv.v.b
00000130: bf 0x20C980C
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 1372
00000140: conv.i.v
00000144: call action_set_cursor(argc=2)
0000014C: popz
00000150: push.imm.e 156
00000154: pushenv 0x20C9848
00000158: push.imm.e 0
0000015C: conv.i.v
00000160: call action_set_relative(argc=1)
00000168: popz
0000016C: push.imm.e 63
00000170: pop.v.i selec
00000178: push.imm.e 1
0000017C: conv.i.v
00000180: call action_set_relative(argc=1)
00000188: popz
0000018C: popenv 0x40C9814
00000190: push.imm.e 0
00000194: conv.i.v
00000198: call action_set_relative(argc=1)
000001A0: popz