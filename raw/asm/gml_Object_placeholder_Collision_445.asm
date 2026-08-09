// gml_Object_placeholder_Collision_445  locals=2 args=0 len=1368
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x21DB5C8
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 82
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x21DB5C8
00000054: b 0x21DB5D0
00000058: popenv 0x41DB58C
0000005C: b 0x21DB5D4
00000060: popenv 0x1DDB5D0
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x21DB81C
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 0
00000080: conv.i.v
00000084: push.v auta
0000008C: call action_if_variable(argc=3)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x21DB73C
000000AC: push.imm.e 156
000000B0: pushenv 0x21DB664
000000B4: push.imm.e 4
000000B8: conv.i.v
000000BC: push.i 200000
000000C4: conv.i.v
000000C8: push.v mon
000000D0: call action_if_variable(argc=3)
000000D8: pop.v.v local.__b__
000000E0: push.local.v local.__b__
000000E8: conv.v.b
000000EC: bf 0x21DB664
000000F0: b 0x21DB66C
000000F4: popenv 0x41DB624
000000F8: b 0x21DB670
000000FC: popenv 0x1DDB66C
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x21DB73C
00000110: push.v other.id
00000118: conv.v.i
0000011C: pushenv 0x21DB6A8
00000120: push.v places
00000128: push.imm.e 1
0000012C: add.i.v
00000130: pop.v.v places
00000138: popenv 0x41DB690
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: call action_set_relative(argc=1)
0000014C: popz
00000150: push.imm.e 1
00000154: pop.v.i auta
0000015C: push.imm.e 1
00000160: conv.i.v
00000164: call action_set_relative(argc=1)
0000016C: popz
00000170: push.imm.e 0
00000174: conv.i.v
00000178: call action_set_relative(argc=1)
00000180: popz
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.imm.e 4
00000190: conv.i.v
00000194: call action_set_alarm(argc=2)
0000019C: popz
000001A0: push.imm.e 1
000001A4: conv.i.v
000001A8: call action_set_relative(argc=1)
000001B0: popz
000001B4: push.imm.e 0
000001B8: conv.i.v
000001BC: call action_set_relative(argc=1)
000001C4: popz
000001C8: exit
000001CC: push.imm.e 156
000001D0: pushenv 0x21DB784
000001D4: push.imm.e 4
000001D8: conv.i.v
000001DC: push.i 200000
000001E4: conv.i.v
000001E8: push.v mon
000001F0: call action_if_variable(argc=3)
000001F8: pop.v.v local.__b__
00000200: push.local.v local.__b__
00000208: conv.v.b
0000020C: bf 0x21DB784
00000210: b 0x21DB78C
00000214: popenv 0x41DB744
00000218: b 0x21DB790
0000021C: popenv 0x1DDB78C
00000220: push.local.v local.__b__
00000228: conv.v.b
0000022C: bf 0x21DB81C
00000230: push.v other.id
00000238: conv.v.i
0000023C: pushenv 0x21DB7D8
00000240: push.imm.e 4
00000244: conv.i.v
00000248: push.imm.e 4
0000024C: conv.i.v
00000250: push.v places
00000258: call action_if_variable(argc=3)
00000260: pop.v.v local.__b__
00000268: popenv 0x41DB7B0
0000026C: push.local.v local.__b__
00000274: conv.v.b
00000278: bf 0x21DB81C
0000027C: push.imm.e 680
00000280: conv.i.v
00000284: push.imm.e -1559
00000288: conv.i.v
0000028C: push.imm.e 123
00000290: conv.i.v
00000294: call action_create_object(argc=3)
0000029C: popz
000002A0: call action_kill_object(argc=0)
000002A8: popz
000002AC: push.imm.e 156
000002B0: pushenv 0x21DB860
000002B4: push.imm.e 0
000002B8: conv.i.v
000002BC: push.imm.e 4
000002C0: conv.i.v
000002C4: push.v selec
000002CC: call action_if_variable(argc=3)
000002D4: pop.v.v local.__b__
000002DC: push.local.v local.__b__
000002E4: conv.v.b
000002E8: bf 0x21DB860
000002EC: b 0x21DB868
000002F0: popenv 0x41DB824
000002F4: b 0x21DB86C
000002F8: popenv 0x1DDB868
000002FC: push.local.v local.__b__
00000304: conv.v.b
00000308: bf 0x21DBAB4
0000030C: push.imm.e 0
00000310: conv.i.v
00000314: push.imm.e 0
00000318: conv.i.v
0000031C: push.v auta
00000324: call action_if_variable(argc=3)
0000032C: pop.v.v local.__b__
00000334: push.local.v local.__b__
0000033C: conv.v.b
00000340: bf 0x21DB9D4
00000344: push.imm.e 156
00000348: pushenv 0x21DB8FC
0000034C: push.imm.e 4
00000350: conv.i.v
00000354: push.i 50000
0000035C: conv.i.v
00000360: push.v mon
00000368: call action_if_variable(argc=3)
00000370: pop.v.v local.__b__
00000378: push.local.v local.__b__
00000380: conv.v.b
00000384: bf 0x21DB8FC
00000388: b 0x21DB904
0000038C: popenv 0x41DB8BC
00000390: b 0x21DB908
00000394: popenv 0x1DDB904
00000398: push.local.v local.__b__
000003A0: conv.v.b
000003A4: bf 0x21DB9D4
000003A8: push.v other.id
000003B0: conv.v.i
000003B4: pushenv 0x21DB940
000003B8: push.v places
000003C0: push.imm.e 1
000003C4: add.i.v
000003C8: pop.v.v places
000003D0: popenv 0x41DB928
000003D4: push.imm.e 0
000003D8: conv.i.v
000003DC: call action_set_relative(argc=1)
000003E4: popz
000003E8: push.imm.e 1
000003EC: pop.v.i auta
000003F4: push.imm.e 1
000003F8: conv.i.v
000003FC: call action_set_relative(argc=1)
00000404: popz
00000408: push.imm.e 0
0000040C: conv.i.v
00000410: call action_set_relative(argc=1)
00000418: popz
0000041C: push.imm.e 0
00000420: conv.i.v
00000424: push.imm.e 4
00000428: conv.i.v
0000042C: call action_set_alarm(argc=2)
00000434: popz
00000438: push.imm.e 1
0000043C: conv.i.v
00000440: call action_set_relative(argc=1)
00000448: popz
0000044C: push.imm.e 0
00000450: conv.i.v
00000454: call action_set_relative(argc=1)
0000045C: popz
00000460: exit
00000464: push.imm.e 156
00000468: pushenv 0x21DBA1C
0000046C: push.imm.e 4
00000470: conv.i.v
00000474: push.i 50000
0000047C: conv.i.v
00000480: push.v mon
00000488: call action_if_variable(argc=3)
00000490: pop.v.v local.__b__
00000498: push.local.v local.__b__
000004A0: conv.v.b
000004A4: bf 0x21DBA1C
000004A8: b 0x21DBA24
000004AC: popenv 0x41DB9DC
000004B0: b 0x21DBA28
000004B4: popenv 0x1DDBA24
000004B8: push.local.v local.__b__
000004C0: conv.v.b
000004C4: bf 0x21DBAB4
000004C8: push.v other.id
000004D0: conv.v.i
000004D4: pushenv 0x21DBA70
000004D8: push.imm.e 4
000004DC: conv.i.v
000004E0: push.imm.e 4
000004E4: conv.i.v
000004E8: push.v places
000004F0: call action_if_variable(argc=3)
000004F8: pop.v.v local.__b__
00000500: popenv 0x41DBA48
00000504: push.local.v local.__b__
0000050C: conv.v.b
00000510: bf 0x21DBAB4
00000514: push.imm.e 680
00000518: conv.i.v
0000051C: push.imm.e -1559
00000520: conv.i.v
00000524: push.imm.e 123
00000528: conv.i.v
0000052C: call action_create_object(argc=3)
00000534: popz
00000538: call action_kill_object(argc=0)
00000540: popz
00000544: push.imm.e 0
00000548: conv.i.v
0000054C: call action_set_relative(argc=1)
00000554: popz