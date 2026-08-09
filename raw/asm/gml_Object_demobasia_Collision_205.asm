// gml_Object_demobasia_Collision_205  locals=2 args=0 len=428
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.v iessa
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20BD230
0000004C: push.imm.e 156
00000050: pushenv 0x20BD12C
00000054: push.imm.e 4
00000058: conv.i.v
0000005C: push.i 50000
00000064: conv.i.v
00000068: push.v mon
00000070: call action_if_variable(argc=3)
00000078: pop.v.v local.__b__
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20BD12C
00000090: b 0x20BD134
00000094: popenv 0x40BD0EC
00000098: b 0x20BD138
0000009C: popenv 0x1CBD134
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20BD230
000000B0: push.imm.e 156
000000B4: pushenv 0x20BD16C
000000B8: push.v mon
000000C0: push.i -50000
000000C8: add.i.v
000000CC: pop.v.v mon
000000D4: popenv 0x40BD150
000000D8: push.v other.id
000000E0: conv.v.i
000000E4: pushenv 0x20BD1B4
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: call action_set_relative(argc=1)
000000F8: popz
000000FC: push.imm.e 1
00000100: pop.v.i deming
00000108: push.imm.e 1
0000010C: conv.i.v
00000110: call action_set_relative(argc=1)
00000118: popz
0000011C: popenv 0x40BD180
00000120: push.imm.e 0
00000124: conv.i.v
00000128: push.imm.e 0
0000012C: conv.i.v
00000130: push.imm.e 584
00000134: conv.i.v
00000138: call action_create_object(argc=3)
00000140: popz
00000144: push.imm.e 128
00000148: pushenv 0x20BD1F0
0000014C: call action_kill_object(argc=0)
00000154: popz
00000158: popenv 0x40BD1E4
0000015C: push.imm.e 130
00000160: pushenv 0x20BD208
00000164: call action_kill_object(argc=0)
0000016C: popz
00000170: popenv 0x40BD1FC
00000174: push.imm.e 129
00000178: pushenv 0x20BD220
0000017C: call action_kill_object(argc=0)
00000184: popz
00000188: popenv 0x40BD214
0000018C: call action_kill_object(argc=0)
00000194: popz
00000198: push.imm.e 0
0000019C: conv.i.v
000001A0: call action_set_relative(argc=1)
000001A8: popz