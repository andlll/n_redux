// gml_Object_media1d_Alarm_3  locals=2 args=0 len=396
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 3
00000018: conv.i.v
0000001C: push.imm.e 120
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 455
00000034: pushenv 0x20DD3B0
00000038: push.imm.e 0
0000003C: conv.i.v
00000040: push.imm.e 1
00000044: conv.i.v
00000048: push.v night
00000050: call action_if_variable(argc=3)
00000058: pop.v.v local.__b__
00000060: push.local.v local.__b__
00000068: conv.v.b
0000006C: bf 0x20DD3B0
00000070: b 0x20DD3B8
00000074: popenv 0x40DD374
00000078: b 0x20DD3BC
0000007C: popenv 0x1CDD3B8
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20DD41C
00000090: push.imm.e 156
00000094: pushenv 0x20DD414
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: call action_set_relative(argc=1)
000000A8: popz
000000AC: push.v ele
000000B4: push.imm.e -150
000000B8: add.i.v
000000BC: pop.v.v ele
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: call action_set_relative(argc=1)
000000D4: popz
000000D8: popenv 0x40DD3D4
000000DC: b 0x20DD468
000000E0: push.imm.e 156
000000E4: pushenv 0x20DD464
000000E8: push.imm.e 1
000000EC: conv.i.v
000000F0: call action_set_relative(argc=1)
000000F8: popz
000000FC: push.v ele
00000104: push.imm.e -60
00000108: add.i.v
0000010C: pop.v.v ele
00000114: push.imm.e 0
00000118: conv.i.v
0000011C: call action_set_relative(argc=1)
00000124: popz
00000128: popenv 0x40DD424
0000012C: push.imm.e 156
00000130: pushenv 0x20DD4B0
00000134: push.imm.e 1
00000138: conv.i.v
0000013C: call action_set_relative(argc=1)
00000144: popz
00000148: push.v mon
00000150: push.imm.e -60
00000154: add.i.v
00000158: pop.v.v mon
00000160: push.imm.e 0
00000164: conv.i.v
00000168: call action_set_relative(argc=1)
00000170: popz
00000174: popenv 0x40DD470
00000178: push.imm.e 0
0000017C: conv.i.v
00000180: call action_set_relative(argc=1)
00000188: popz